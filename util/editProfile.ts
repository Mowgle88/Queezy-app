import { IUser, IUserData } from "../models/user";
import { changeUserPassword, changeUserEmail } from "./auth";
import { updateUser } from "./http";

interface IAuthCtx {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

interface IUserCtx {
  user: {
    userId: string,
    userName: string,
    email: string,
    password: string,
    date: string,
  },
  setUser: (userData: IUser) => void,
  removeUser: () => void;
}

export function changeUserName(userData: IUserData, userCtx: IUserCtx) {
  const user = { ...userCtx.user };
  Reflect.deleteProperty(user, 'userId');
  user.userName = userData.userName;

  updateUser(userCtx.user.userId, user);
  userCtx.setUser({ ...user, userId: userCtx.user.userId })
}

export async function changeEmail(userData: IUserData, authCtx: IAuthCtx, userCtx: IUserCtx) {
  const user = { ...userCtx.user };
  Reflect.deleteProperty(user, 'userId');
  user.email = userData.email;

  updateUser(userCtx.user.userId, user);
  userCtx.setUser({ ...user, userId: userCtx.user.userId });
  const token = await changeUserEmail(user.email, authCtx.token);
  authCtx.authenticate(token);
}

export async function changePassword(userData: IUserData, authCtx: IAuthCtx, userCtx: IUserCtx) {

  const user = { ...userCtx.user };
  Reflect.deleteProperty(user, 'userId');
  user.password = userData.password;
  user.date = userData.date;

  updateUser(userCtx.user.userId, user);
  userCtx.setUser({ ...user, userId: userCtx.user.userId });
  const token = await changeUserPassword(user.password, authCtx.token);
  authCtx.authenticate(token);
}