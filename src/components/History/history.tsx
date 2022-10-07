import { Timeline } from "@mui/lab";
import { HistoryEntry } from "../../types/historyEntryType";
import HistoryItem from "./historyItem";
import { Card } from "@mui/material";
import { optisTheme } from "../../assets/styles/theme";

export default function History(props: { history: HistoryEntry[] }) {

  const hasHistory = () => {
    return props.history?.length !== 0;
  }

  return (
    <div>
      {hasHistory() ? (
    <Card
    variant="outlined"
    sx={{ mx: {xs: 1, md: 4},p: 1, boxShadow: '0 2px 6px #d0efef', height: {md: 448,
      scrollbarWidth: "thin",
      scrollbarColor: `${optisTheme.palette.secondary.light} #fff`,
      overflow: "auto",
      height: {
        xs: "calc(100vh - 64px - 60px - 126px)",
        md: "calc(100vh - 64px - 101px)",
      },
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: optisTheme.palette.secondary.light,
        outline: "0px solid slategrey",
        borderRadius: 0.5,
      },
    }}}
    >
    <Timeline>
      {props.history ? (
        props.history.map((h, i, arr) => <HistoryItem entry={h} key={i} isLast={i === arr.length - 1} />)
      ) : (
        <></>
      )}
    </Timeline>
    </Card>
    ) : <></>}
    </div>
  );
}
