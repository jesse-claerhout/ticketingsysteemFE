import { Box, Button } from "@mui/material";
import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optisTheme } from "../../assets/styles/theme";
import { UserInfo } from "../../context/userContext";

type NavigationMenuProps = {
  pagesNav: string[];
  userInfo: UserInfo;
  highlightedButton: string;
  sethighlightedButton: Dispatch<React.SetStateAction<string>>;
};

export default function NavigationMenu({
  pagesNav,
  userInfo,
  highlightedButton,
  sethighlightedButton,
}: NavigationMenuProps) {

  let navigate = useNavigate();

  useEffect(() => {
    sethighlightedButton(pagesNav[0])
    return sethighlightedButton(pagesNav[0])
  }, [pagesNav])

  const handleClickNavMenu = (
    page: String,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (page.match("Mijn Tickets")) {
      sethighlightedButton("Mijn Tickets")
      navigate("/my-tickets");
    } else if (page.match("Toegewezen Tickets")) {
      sethighlightedButton("Toegewezen Tickets")
      navigate("/my-tickets");
    } else if (page.match("Alle Tickets")) {
      sethighlightedButton("Alle Tickets")
      navigate("/tickets");
    } else if (page.match("Openstaande Tickets")) {
      sethighlightedButton("Openstaande Tickets")
      navigate("/open-tickets");
    }
  };

  return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {userInfo.isAuthenticated
          ? pagesNav.map((page) => (
              <Button
                key={page}
                onClick={(event) => handleClickNavMenu(page, event)}
                sx={{ py: 2, color: page === highlightedButton ? optisTheme.palette.primary.main : "white", display: "block"}}
              >
                {page}
              </Button>
            ))
          : <></> }
      </Box>
  );
}
