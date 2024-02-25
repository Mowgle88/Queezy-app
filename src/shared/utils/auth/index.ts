import axios, { AxiosResponse } from "axios";
import { getDatabase, set, ref, child } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { FirebaseError } from "@firebase/util";
import { IUser } from "#types";
import { auth } from "#utils";
import { WEB_API_KEY } from "#env";

GoogleSignin.configure({
  webClientId:
    "1032740223218-gakicmli64oimceepan16cvmfenf891m.apps.googleusercontent.com",
});

type mode = "signInWithPassword" | "signUp";

interface IAuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

interface IChengeEmailResponse {
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: { providerId: string; federatedId: string }[];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface IChengePasswordResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts";

export const signInWithGoogle = async () => {
  try {
    const isSigned = await GoogleSignin.isSignedIn();
    if (isSigned) await GoogleSignin.signOut();

    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    const googleCredentials = GoogleAuthProvider.credential(idToken);
    const { user } = await signInWithCredential(auth, googleCredentials);
    const tokenResult = await user.getIdTokenResult();

    const { token } = tokenResult;
    const userData = {
      userId: user.uid,
      email: user.email || "",
      userName: user.displayName || "",
      date: new Date().toISOString().slice(0, 10),
      // date: user.metadata.creationTime || "",
    };

    return { userData, token };
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof FirebaseError) {
      const errorCode = error.code;

      let message = "Something went wrong.";

      if (errorCode === statusCodes.SIGN_IN_CANCELLED) {
        message = "SIGN_IN_CANCELLED";
      } else if (errorCode === statusCodes.IN_PROGRESS) {
        message = "IN_PROGRESS";
      } else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        message = "PLAY_SERVICES_NOT_AVAILABLE";
      } else {
        message = error.message;
      }
      throw new Error(message);
    }
    return { userData: { userId: "" }, token: "" };
  }
};

export const authenticate = async (
  mode: mode,
  email: string,
  password: string,
) => {
  const URL = `${AUTH_URL}:${mode}?key=${WEB_API_KEY}`;

  const response: AxiosResponse<IAuthResponseData> = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const userId = response.data.localId;

  return { userId, token };
};

export const signUp = async (email: string, password: string) => {
  // return authenticate("signUp", email, password);
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { uid: userId } = response.user;
    const { token } = await response.user.getIdTokenResult();
    return { token, userId };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      let message = "Something went wrong.";
      if (errorCode === "auth/email-already-in-use") {
        message = "This email is already is use";
      }
      throw new Error(message);
    }
    return { token: "", userId: "" };
  }
};

export const login = (email: string, password: string) => {
  return authenticate("signInWithPassword", email, password);
};

export const createUser = async (userData: Partial<IUser>) => {
  const user = {
    ...userData,
    settings: {
      difficulty: "medium",
      isTimeGame: false,
      timeOnAnswer: 60,
    },
    quizData: {
      points: 0,
    },
  };

  try {
    const dbRef = ref(getDatabase());
    const childRef = child(dbRef, `users/${userData.userId}`);
    await set(childRef, user);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;

      let message = "Something went wrong.";

      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        message = "The username or password was incorrect";
      }

      throw new Error(message);
    }
  }
  // await axios.post(`${BACKEND_URL}/users.json`, user);
  // return user;
};

export const changeUserEmail = async (email: string, token: string) => {
  const URL = `${AUTH_URL}:update?key=${WEB_API_KEY}`;
  try {
    const response: AxiosResponse<IChengeEmailResponse> = await axios.post(
      URL,
      {
        email: email,
        idToken: token,
        returnSecureToken: true,
      },
    );
    const newToken = response.data.idToken;
    return newToken;
  } catch (error) {
    console.log(error);
  }
};

export const changeUserPassword = async (password: string, token: string) => {
  const URL = `${AUTH_URL}:update?key=${WEB_API_KEY}`;

  const response: AxiosResponse<IChengePasswordResponse> = await axios.post(
    URL,
    {
      password: password,
      idToken: token,
      returnSecureToken: true,
    },
  );

  const newToken = response.data.idToken;
  return newToken;
};
