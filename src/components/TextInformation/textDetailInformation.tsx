import { Box, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export type InputProps = {
  label?: string;
  textInformation: string;
  icon?: ReactNode;
  fontSize?: "large" | "normal" | "small";
};

export const TextDetailInformation = ({
  label,
  textInformation,
  icon,
  fontSize = "large",
}: InputProps) => {
  
  //check if textinformation null else is hidden
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (textInformation === null) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [textInformation]);

  return (
    <>
      <Typography
        hidden={hidden}
        variant="button"
        fontWeight={"bold"}
        fontSize={fontSize}
      >
        {label ? (label + ":") : <></>}
      </Typography>
      <Box hidden={hidden} sx={{ display: "flex", alignItems: "center", mb: 1, width: "100%"}}>
        {icon}
        <Typography hidden={hidden} variant="body1" style={{overflowWrap: "anywhere"}} >
          {textInformation}
        </Typography>
      </Box>
    </>
  );
};
