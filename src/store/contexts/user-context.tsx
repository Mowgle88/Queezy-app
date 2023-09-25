import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IQuizData, ISettings, IUser } from "../../shared/types";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export interface IUserContext {
  user: IUser;
  settings: ISettings;
  quizData: IQuizData;
  setUser: (userData: IUser) => void;
  removeUser: () => void;
  setSettings: (settings: ISettings) => void;
  setQuizData: (quizData: IQuizData) => void;
}

export const UserContext = createContext<IUserContext>({
  user: {
    userId: "",
    userName: "",
    email: "",
    password: "",
    date: "",
  },
  settings: {
    difficulty: "medium",
    isTimeGame: false,
    timeOnAnswer: 60,
  },
  quizData: {
    points: 0,
  },
  setUser: (userData: IUser) => {},
  removeUser: () => {},
  setSettings: (settings: ISettings) => {},
  setQuizData: (quizData: IQuizData) => {},
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState({
    userId: "",
    email: "",
    password: "",
    userName: "",
    date: "",
  });

  const [settingsData, setSettingsData] = useState<ISettings>({
    difficulty: "medium",
    isTimeGame: false,
    timeOnAnswer: 60,
  });

  const [userQuizData, setUserQuizData] = useState({
    points: 0,
  });

  function setUser(userData: IUser) {
    setUserData(userData);
    const localStorageUserData = {
      userName: userData.userName,
      userId: userData.userId,
    };
    AsyncStorage.setItem("userData", JSON.stringify(localStorageUserData));
  }

  function setSettings(settings: ISettings) {
    setSettingsData(settings);
    AsyncStorage.setItem("settingsData", JSON.stringify(settingsData));
  }

  function setQuizData(quizData: IQuizData) {
    setUserQuizData(quizData);
    AsyncStorage.setItem("quizData", JSON.stringify(userQuizData));
  }

  const removeUser = () => {
    setUserData({
      userId: "",
      email: "",
      password: "",
      userName: "",
      date: "",
    });
    setSettingsData({
      difficulty: "medium",
      isTimeGame: false,
      timeOnAnswer: 60,
    });
    setUserQuizData({
      points: 0,
    });
    AsyncStorage.removeItem("userData");
    AsyncStorage.removeItem("settingsData");
    AsyncStorage.removeItem("quizData");
  };

  const value = {
    user: {
      userId: userData.userId,
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      date: userData.date,
    },
    settings: settingsData,
    quizData: userQuizData,
    setUser: setUser,
    removeUser: removeUser,
    setSettings: setSettings,
    setQuizData: setQuizData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
