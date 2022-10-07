const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.refreshToken
};
const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.jwt_token;
};
const updateLocalAccessToken = (token: any) => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  user.jwt_token = `${token}`;
  localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};
const setUser = (user: String) => {
  //console.log(JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
};
const removeUser = () => {
  localStorage.removeItem("user");
};

const removeUserInfo = () => {
  localStorage.removeItem("user-info");
}

const TokenHandling = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  removeUserInfo,
};
export default TokenHandling;
