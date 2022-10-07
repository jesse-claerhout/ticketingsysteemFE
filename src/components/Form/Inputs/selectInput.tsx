import { MenuItem, SxProps, TextField } from "@mui/material";
import { FC, forwardRef } from "react";

export type SelectProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
  selectData?: string[];
  sx?: SxProps;
};

export const Select: FC<SelectProps> = forwardRef<
  HTMLInputElement,
  SelectProps
>(
  (
    { id, name, label, defaultValue="", error = false, helperText = "", selectData, sx, ...props },
    ref
  ) => {
    return (
      <TextField
        sx={sx}
        label={label}
        name={name}
        select
        fullWidth
        defaultValue={defaultValue}
        error={error}
        helperText={helperText}
        ref={ref}
        {...props}
      >
        {selectData ? (
          selectData.map((b, i) => {
            return (
              <MenuItem key={i} value={b}>
                {b}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem>{label}en aan het ophalen...</MenuItem>
        )}
      </TextField>
    );
  }
);
