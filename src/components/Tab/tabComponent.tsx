import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { optisTheme } from "../../assets/styles/theme";
import { TicketDetailModel } from "../../types/ticketDetailModel";
import TicketDetailHeader from "../TicketDetails/ticketDetailHeader";

export type TabComponentProps = {
  tabs: {
    label: String;
    component: JSX.Element;
  }[];
  data: TicketDetailModel;
  pageId: string | undefined;
  fetchDetailCallback: () => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function TabComponent({
  tabs,
  data,
  pageId,
  fetchDetailCallback,
}: TabComponentProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            {tabs.map(({ label }, index) => (
              <Tab label={label} key={index} {...TabProps(index)} />
            ))}
          </Tabs>
          <TicketDetailHeader
            data={data}
            pageId={pageId}
            fetchDetailCallback={fetchDetailCallback}
          />
        </Box>
        <Box
          component="div"
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: `${optisTheme.palette.secondary.main} #fff`,
            overflow: "auto",
            height: {xs: "calc(100vh - 64px - 60px - 126px)", md: "calc(100vh - 64px - 60px - 96px)"},
            "&::-webkit-scrollbar": {
              width: "0.3em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: optisTheme.palette.secondary.main,
              outline: "0px solid slategrey",
              borderRadius: 0.5,
            },
          }}
        >
          {tabs.map(({ component }, i) => (
            <TabPanel value={value} index={i} key={i}>
              {component}
            </TabPanel>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
