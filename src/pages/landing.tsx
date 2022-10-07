import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Landing() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    //eslint-disable-next-line
    userInfo.isAuthenticated ? userInfo.isHandyman ? navigate("/open-tickets") : navigate("/my-tickets") : navigate("/login");
  }, [navigate, userInfo.isAuthenticated, userInfo.isHandyman]);

  return <></>;
}