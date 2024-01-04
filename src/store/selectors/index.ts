import * as auth from "./auth";
import * as user from "./user";
import * as quiz from "./quiz";

export const selectors = {
  ...auth,
  ...user,
  ...quiz,
};
