import { Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

type OptisLogoProps = {
  isMobile: boolean;
  imageSrc: string;
  imageLabel: string;
  route: string;
  pagesNav: string[];
  setHiglightedButton: Dispatch<SetStateAction<string>>;
}

export default function ClickNavigateLogo({
  isMobile,
  imageSrc,
  imageLabel,
  route,
  pagesNav,
  setHiglightedButton,
}: OptisLogoProps) {

  const { userInfo, setUserInfo } = useContext(UserContext);

const handleClick = () => {
  setHiglightedButton(pagesNav[0]);
}

  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={
        isMobile
          ? { pt: "10px", display: { xs: "flex", md: "none" }, ml: userInfo.isAuthenticated ? "48px" : "0px" }
          : { mr: 2, display: { xs: "none", md: "flex" }, pt: "10px" }
      }
    >
      <Link to={route}>
        <img className="logo-image" src={imageSrc} alt={imageLabel} onClick={() => handleClick()}></img>
      </Link>
    </Typography>
  );
}
