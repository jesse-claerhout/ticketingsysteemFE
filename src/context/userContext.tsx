import { createContext, Dispatch, SetStateAction } from "react";

export type UserInfo = {
  isAuthenticated: boolean;
  isHandyman: boolean;
  name?: string;
};

export const defaultUserInfo: UserInfo = {
  isAuthenticated: false,
  isHandyman: false,
  name: undefined,
};

export interface UserState {
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

export const defaultUserState: UserState = {
  userInfo: defaultUserInfo,
  setUserInfo: () => null,
};

export const UserContext = createContext<UserState>(defaultUserState);
