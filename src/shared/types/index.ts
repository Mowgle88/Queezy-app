export type CategoryName =
  | "art"
  | "films"
  | "history"
  | "music"
  | "science"
  | "sport"
  | "travel";

export interface IUser {
  userId: string;
  email: string;
  password: string;
  userName: string;
  date: string;
}

export type UserData = Omit<IUser, "userId">;

export type UserQuizData = {
  points: number;
};

export interface IUserBackendData {
  email: string;
  password: string;
  userName: string;
  date: string;
  settings: ISettings;
  quizData: IQuizData;
}

export interface ISettings {
  difficulty: DifficultyDataType;
  isTimeGame: boolean;
  timeOnAnswer: number;
}

export type DifficultyDataType = "easy" | "medium" | "hard";

export type EditProfileScreenType =
  | "profile"
  | "email"
  | "password"
  | "difficulty";

export interface IQuizData {
  points: number;
}

export type LocalStorageUserData = Omit<IUser, "email" | "password" | "date">;

export type IQuizCategoriesData = {
  [key in CategoryName]: IDifficultyData;
};

export interface IDifficultyData {
  easy: IQuizItem[];
  medium: IQuizItem[];
  hard: IQuizItem[];
}

export interface IQuizItem {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
}

export type RadioButtonProps<Type> = {
  key: Type;
  value: string;
};

export interface ICredentialsInvalid {
  userName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface IAnswersData {
  id: string;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
}
