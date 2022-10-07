import interceptors from "./interceptors";
import tokenHandling from "./tokenHandling";
import TokenHandling from "./tokenHandling";
import Login from "../types/loginType";
import Register from "../types/registerType";

const login = async ({ email, password }: Login) => {
  return await interceptors
    .post<any>("/auth/login", { email, password })
    .then((response) => {
      if (response.data.jwt_token) {
        TokenHandling.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenHandling.removeUser();
  TokenHandling.removeUserInfo();
};

const register = async ({
  firstName,
  lastName,
  email,
  password,
  repeatPassword,
}: Register) => {
  return await interceptors
    .post<any>("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
    })
    .then((response) => {
      if (response.data.jwt_token) {
        tokenHandling.setUser(response.data);
        window.dispatchEvent(new Event("storage"));
      }
      return response.data;
    });
};

const getCurrentUser = () => {
  return TokenHandling.getUser();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
