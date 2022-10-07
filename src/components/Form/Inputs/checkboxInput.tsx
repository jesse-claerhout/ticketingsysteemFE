import { FormControlLabel, Checkbox, SxProps } from "@mui/material";
import { FC, forwardRef } from "react";

export type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
  sx?: SxProps;
};

export const CheckboxInput: FC<CheckboxProps> = forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(({ id, name, label, defaultChecked, sx, ...props }, ref) => {
  return (
    <FormControlLabel
      label="Zichtbaar voor iedereen?"
      control={<Checkbox defaultChecked name={name} ref={ref} {...props} sx={sx}/>}
    />
  );
});
