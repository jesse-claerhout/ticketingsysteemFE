import { Button, SxProps } from "@mui/material";
import { FC, forwardRef } from "react";

type ButtonVariant = "outlined" | "contained" | "text";
type ButtonType = "submit" | "button" | "reset";

export type ButtonProps = {
  variant?: ButtonVariant;
  type?: ButtonType;
  form?: string;
  sx?: SxProps;
};

export const ButtonInput: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      sx,
      variant = "contained",
      type,
      form,
      ...props
    },
    ref
  ) => {
            return (
                <Button
                    sx={sx}
                    variant={variant}
                    type={type}
                    form={form}
                    ref={ref}
                    {...props} />
            );
        }
);
