// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  // getAuth,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_CONFIG_API_KEY } from "#env";

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: FIREBASE_CONFIG_API_KEY,
    authDomain: "art-quiz-f71ff.firebaseapp.com",
    databaseURL:
      "https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "art-quiz-f71ff",
    storageBucket: "art-quiz-f71ff.appspot.com",
    messagingSenderId: "1032740223218",
    appId: "1:1032740223218:web:2670042e36fd727dd6386b",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};

export const getDbRef = () => {
  const app = getFirebaseApp();
  return ref(getDatabase(app));
};

// export const auth = getAuth(getFirebaseApp());

export const auth = initializeAuth(getFirebaseApp(), {
  persistence: getReactNativePersistence(AsyncStorage),
});
