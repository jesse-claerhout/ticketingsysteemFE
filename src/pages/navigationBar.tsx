import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import optisLogo from "../assets/images/opticket_logo.png";
import "../assets/styles/navigationBar.css";
import { optisTheme } from "../assets/styles/theme";
import ClickNavigateLogo from "../components/ClickNavigateLogo/clickNavigateLogo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import NavigationMenu from "../components/ResponsiveMenus/navigationMenu";
import NavigationMenuMobile from "../components/ResponsiveMenus/navigationMenuMobile";
import ProfileMenu from "../components/ResponsiveMenus/profileMenu";
import NotificationButton from "../components/Notification/notificationButton";
import { Box } from "@mui/material";

const pagesNavUser = ["Mijn Tickets", "Alle Tickets"];
const pagesNavHandyman = [
  "Openstaande Tickets",
  "Toegewezen Tickets",
  "Alle Tickets",
];
const settings = ["Logout"];

export default function NavigationBar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [pagesNav, setPagesNav] = useState(pagesNavUser);
  const [route, setRoute] = useState("/my-tickets");
  const [highlightedButton, sethighlightedButton] = useState(pagesNav[0]);

  useEffect(() => {
    if (userInfo.isHandyman) {
      setPagesNav(pagesNavHandyman);
      setRoute("/open-tickets");
    } else {
      setPagesNav(pagesNavUser);
      setRoute("/my-tickets");
    }
  }, [userInfo.isHandyman]);

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: optisTheme.palette.common.black,
        boxShadow: "0px 0px 7px 0px #3DB8AD",
        height: "64px",
      }}
    >
      <Container maxWidth={false} style={{ height: "64px" }}>
        <Toolbar disableGutters style={{ height: "64px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: userInfo.isAuthenticated ? "space-between" : "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ClickNavigateLogo
                isMobile={false}
                imageSrc={optisLogo}
                imageLabel="Optis-Logo"
                route={route}
                pagesNav={pagesNav}
                setHiglightedButton={sethighlightedButton}
              />
              <NavigationMenu
                pagesNav={pagesNav}
                userInfo={userInfo}
                highlightedButton={highlightedButton}
                sethighlightedButton={sethighlightedButton}
              />
              <NavigationMenuMobile pagesNav={pagesNav} userInfo={userInfo} />
            </Box>
            <ClickNavigateLogo
              isMobile={true}
              imageSrc={optisLogo}
              imageLabel="Optis-Logo"
              route={route}
              pagesNav={pagesNav}
              setHiglightedButton={sethighlightedButton}      
              />
            {userInfo.isAuthenticated ? 
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NotificationButton />
              <ProfileMenu
                links={settings}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setHighlightedButton={sethighlightedButton}
                pagesNav={pagesNav}
              />
            </Box>  : <></>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
