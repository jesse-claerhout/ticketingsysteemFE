import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../context/userContext";
import MenuIcon from "@mui/icons-material/Menu";

type NavigationMenuMobileProps = {
  pagesNav: string[];
  userInfo: UserInfo;
};

export default function NavigationMenuMobile({
  pagesNav,
  userInfo,
}: NavigationMenuMobileProps) {
  //router
  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickNavMenu = (
    page: String,
    event: React.MouseEvent<HTMLElement>
  ) => {
    handleCloseNavMenu();
    if (page.match("Mijn Tickets")) {
      navigate("/my-tickets");
    } else if(page.match("Toegewezen Tickets")) {
      navigate("/my-tickets")
    }  else if (page.match("Alle Tickets")) {
      navigate("/tickets");
    } else if (page.match("Openstaande Tickets")) {
      navigate("/open-tickets");
    }
  };

  return (
    <Box
      sx={{
        flexGrow: { xs: !userInfo.isAuthenticated ? 50 : 1, md: 1 },
        display: { xs: userInfo.isAuthenticated ? "flex" : "none", md: "none" },
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {userInfo.isAuthenticated
          ? pagesNav.map((page) => (
              <MenuItem
                key={page}
                onClick={(event) => handleClickNavMenu(page, event)}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))
          : <div></div>}
      </Menu>
    </Box>
  );
}
