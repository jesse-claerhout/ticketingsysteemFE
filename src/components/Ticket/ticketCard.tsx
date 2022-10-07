import { TicketModel } from "../../types/ticketModel";
import { useNavigate } from "react-router-dom";
import PendingIcon from "@mui/icons-material/Pending";
import BuildIcon from "@mui/icons-material/Build";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode, useContext } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserContext } from "../../context/userContext";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LetterAvatar from "../Avatar/letterAvatar";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function BasicCard({
  ticketId,
  title,
  state,
  priority,
  ticketLocationBuildingAddress,
  thumbnailURL,
  created,
  follows,
  appointed,
}: TicketModel) {
  let navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  return (
    <Card
      sx={{ m: 1, display: "flex", height: "8rem", cursor: "pointer", borderRadius: 2, boxShadow: '0 2px 6px #d0efef' }}
      onClick={() => navigate(`/tickets/${ticketId}`)}
      variant="elevation"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: { xs: "100%", sm: "100%" },
          width: "100%",
        }}
      >
        <CardContent>
          <Typography
            color="text.primary"
            variant="h6"
            noWrap={true}
            sx={{ mb: 1.5 }}
          >
            #{ticketId}: {title}
          </Typography>
          <Box
            color={state}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ display: "flex", justifyContent: "center", minWidth: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"  }}
            >
              {renderStateIcon(state)}
              {state}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {renderPriorityIcon(priority)}
              {priority}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <Typography color="text.secondary" sx={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
              {ticketLocationBuildingAddress}
            </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
              {appointed ? (
                <Tooltip
                  title="Toegewezen aan klusjesman"
                  disableFocusListener
                  disableTouchListener
                  sx={{ ml: 1 }}
                >
                  <EngineeringIcon />
                </Tooltip>
              ) : null}
              {created ? (
                <Tooltip 
                title="Dit ticket is gemaakt door jou">
                  <IconButton disableRipple sx={{p: 0, ml: 1}}>
                  <LetterAvatar userName={userInfo.name} size="small" />
                  </IconButton>
                </Tooltip>
              ) : null}
              {userInfo.isHandyman ? null : follows ? (
                <Tooltip
                  title="Je volgt dit ticket"
                  disableFocusListener
                  disableTouchListener
                >
                  <VisibilityIcon />
                </Tooltip>
              ) : null}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export function renderStateIcon(state: string): ReactNode {
  switch (state) {
    case "Open":
      return <BookmarkIcon fontSize="small" sx={{ color: "red", mr: 1 }} />;
    case "Werkman aangesteld":
      return (
        <ArrowDropUpIcon
          fontSize="small"
          sx={{ color: "yellowgreen", mr: 1 }}
        />
      );
    case "Bezig":
      return <BuildIcon fontSize="small" sx={{ color: "orange", mr: 1 }} />;
    case "Wachten op goedkeuring":
      return <PendingIcon fontSize="small" sx={{ color: "orange", mr: 1 }} />;
    case "Wachten op materiaal":
      return <PendingIcon fontSize="small" sx={{ color: "orange", mr: 1 }} />;
    case "Gesloten":
      return (
        <BookmarkAddedIcon fontSize="small" sx={{ color: "green", mr: 1 }} />
      );
  }
}

export function renderPriorityIcon(priority: string): ReactNode {
  switch (priority) {
    case "P1":
      return <ReportGmailerrorredOutlinedIcon fontSize="small" sx={{ color: "red", mr: 1 }} />
    case "P2":
      return <ChangeHistoryOutlinedIcon fontSize="small" sx={{ color: "orange", mr: 1 }} />
    case "P3":
      return <HorizontalRuleIcon fontSize="small" sx={{ color: "green", mr: 1 }} />
    case "P4":
      return <ChangeHistoryOutlinedIcon fontSize="small" sx={{ color: "#66DE99", mr: 1, transform: "rotateX(180deg)" }} />
    case "P5":
      return <CircleOutlinedIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
  }
}