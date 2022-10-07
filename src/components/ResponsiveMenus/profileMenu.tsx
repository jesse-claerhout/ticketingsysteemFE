import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LetterAvatar from "../Avatar/letterAvatar";
import { defaultUserInfo, UserInfo } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import React, { useState } from "react";

type ProfileMenuProps = {
  links: string[];
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  setHighlightedButton: React.Dispatch<React.SetStateAction<string>>;
  pagesNav: string[];
};

export default function ProfileMenu({
  links,
  userInfo,
  setUserInfo,
  setHighlightedButton,
  pagesNav,
}: ProfileMenuProps) {
  let navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenu = (
    setting: String,
    event: React.MouseEvent<HTMLElement>
  ) => {
    handleCloseUserMenu();
    if (setting.match("Logout")) {
      AuthService.logout();
      setUserInfo(defaultUserInfo);
      setHighlightedButton(pagesNav[0])
      navigate("");
    }
  };

  return (
        <Box
          hidden= {!userInfo.isAuthenticated}
          sx={{flexGrow: 0,}}
        >
          <Tooltip title="Profiel menu openen">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <LetterAvatar userName={userInfo.name} size="normal"/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {links.map((link) => (
              <MenuItem
                key={link}
                onClick={(event) => handleClickUserMenu(link, event)}
              >
                <Typography textAlign="center">{link}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
  );
}
