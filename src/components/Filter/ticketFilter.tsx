import { status, locatie, prioriteit } from "./filterNodes";
import { Box, Button, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Typography, TextField } from "@mui/material";
import TreeCheckBoxes from "./treeCheckboxes";
import { optisTheme } from "../../assets/styles/theme";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

type TicketFilterProps = {
  statusNodesHidden?: boolean;
  locationNodesHidden?: boolean;
  prioritiesNodesHidden?: boolean;
  fetchTickets(stateParams?: string[], buildingParams?: string[], sortParams?: string, searchParam?: string): void;
};

function TicketFilter({
  statusNodesHidden,
  locationNodesHidden,
  prioritiesNodesHidden,
  fetchTickets,
}: TicketFilterProps) {
  const [stateParams, setStateParams] = useState<string[]>([]);
  const [buildingParams, setBuildingParams] = useState<string[]>([]);
  const [priorityParams, setPriorityParams] = useState<string[]>([]);
  const [sortParams, setSortParams] = useState<string | undefined>("");
  const [searchParam, setSearchParam] = useState<string | undefined>(undefined);
  const [reset, setReset] = useState(false);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchTickets(stateParams, buildingParams, sortParams, searchParam)
  }, [stateParams, buildingParams, sortParams, searchParam, fetchTickets])

  function resetFilters() {
    setStateParams([]);
    setBuildingParams([]);
    setReset(true);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSortParams(event.target.value);
  };

  const handleSearch = debounce((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchParam(event.target.value)
  }, 500)

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        backgroundColor: "#FCFAFC",
        pl: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" sx={{height: "58px"}} >
        <TextField variant="standard" type="search" placeholder="Zoeken op titel" onChange={handleSearch} sx={{ ml: 1, mr: 2, pb: 1, width: "100%"  }} />
      </Box>
      <Divider sx={{mr: 2, ml: 1}}/>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{height: "58px"}}>
      <Typography variant="h5" sx={{ pl: 1 }}>
          Sorteren
      </Typography>

      <FormControl sx={{pl: 5, pr: 2, width: "100%"}}>
        <Select
          id="Sorteren"
          value={sortParams}
          onChange={handleChange}
          fullWidth
          sx={{height: "35px"}}
        >
          <MenuItem value="">
            <em>Geen sortering</em>
          </MenuItem>
          <MenuItem value={"title,asc"}>Op titel van A tot Z</MenuItem>
          <MenuItem value={"title,desc"}>Op titel van Z tot A</MenuItem>
          <MenuItem value={"priority,asc"}>Op prioriteit van P1 tot P5</MenuItem>
          <MenuItem value={"priority,desc"}>Op prioriteit van P5 tot P1</MenuItem>
        </Select>
      </FormControl>

      </Box>
      <Divider sx={{mr: 2, ml: 1}}/>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" sx={{height: "58px"}}>
        <Typography variant="h5" sx={{ pl: 1, pt: 2 }}>
          Filters
        </Typography>
        <Button color="secondary" onClick={resetFilters} sx={{pr: 2}}>
          Reset
        </Button>
      </Box>
      <Divider sx={{mr: 2, ml: 1}}/>
      <Box
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: `${optisTheme.palette.secondary.light} #fff`,
          overflow: "auto",
          height: "calc(100vh - 64px - 59px - 59px - 59px)",
          pl: 2,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: optisTheme.palette.secondary.light,
            outline: "0px solid slategrey",
            borderRadius: 0.5,
          },
        }}
      >
        {prioritiesNodesHidden ? null : (
          <>
          <Typography variant="subtitle1">Prioriteiten</Typography>
            <TreeCheckBoxes
              nodes={prioriteit}
              setQueryParams={setPriorityParams}
              filters={priorityParams}
              reset={reset}
              setReset={setReset}
            />
          </>
        )}
        {statusNodesHidden ? null : (
          <>
            <Typography variant="subtitle1">Status</Typography>
            <TreeCheckBoxes
              nodes={status}
              setQueryParams={setStateParams}
              filters={stateParams}
              reset={reset}
              setReset={setReset}
            />
          </>
        )}
        {locationNodesHidden ? null : (
          <>
            <Typography variant="subtitle1">Locatie</Typography>
            <TreeCheckBoxes
              nodes={locatie}
              setQueryParams={setBuildingParams}
              filters={buildingParams}
              reset={reset}
              setReset={setReset}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default TicketFilter;
