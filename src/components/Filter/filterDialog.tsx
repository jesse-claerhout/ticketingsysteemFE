import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { locatie, status } from "./filterNodes";
import TreeCheckBoxes from "./treeCheckboxes";
import CloseIcon from "@mui/icons-material/Close";
import { optisTheme } from "../../assets/styles/theme";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

type FilterDialogProps = {
  dialogOpen: boolean;
  handleClose(): void;
  statusNodesHidden?: boolean;
  locationNodesHidden?: boolean;
  prioritiesNodesHidden?: boolean;
  fetchTickets(stateParams?: string[], buildingParams?: string[], sortParams?: string): void;
};

function FilterDialog({
  dialogOpen,
  handleClose,
  statusNodesHidden,
  locationNodesHidden,
  prioritiesNodesHidden,
  fetchTickets,
}: FilterDialogProps) {
  const [stateParams, setStateParams] = useState<string[]>([]);
  const [buildingParams, setBuildingParams] = useState<string[]>([]);
  const [sortParams, setSortParams] = useState<string>("");

  const [reset, setReset] = useState(false);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchTickets(stateParams, buildingParams, sortParams);
  }, [stateParams, buildingParams, sortParams, fetchTickets]);

  function resetFilters() {
    setStateParams([]);
    setBuildingParams([]);
    setReset(true);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSortParams(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
        open={dialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Filteren en sorteren
          <Tooltip title="Sluit">
            <CloseIcon fontSize="medium" onClick={handleClose} />
          </Tooltip>
        </DialogTitle>
        <DialogContent sx={{height: "75vh"}}>
          <Box sx={{height: "92px"}}>
            <Typography variant="h5" sx={{ pl: 1, pt: 2 }}>
              Sorteren
            </Typography>

            <FormControl sx={{ pl: 1, pr: 2, pb: 1, width: "100%" }}>
              <Select
                id="Sorteren"
                value={sortParams}
                onChange={handleChange}
                fullWidth
                sx={{ height: "35px" }}
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
          <Divider sx={{ mr: 2, ml: 1 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ height: "58px" }}
          >
            <Typography variant="h5" sx={{ pl: 1, pt: 2 }}>
              Filters
            </Typography>
          </Box>
          <Divider sx={{ mr: 2, ml: 1 }} />
          <Box
            sx={{
              scrollbarWidth: "thin",
              scrollbarColor: `${optisTheme.palette.secondary.light} #fff`,
              pl: 2,
              overflow: "auto",
              height: "calc(75vh - 93px - 92px)",
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
                  nodes={status}
                  setQueryParams={setStateParams}
                  filters={stateParams}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters}>Reset</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FilterDialog;
