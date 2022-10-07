import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, SxProps, TextField, Typography } from "@mui/material";
import React, { FC, forwardRef, useState } from "react";

export type InputType = "text" | "email" | "password" | "date";
export type InputAutoComplete =
  | "given-name"
  | "family-name"
  | "email"
  | "password"
  | "off";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  autoComplete?: InputAutoComplete;
  error?: boolean;
  helperText?: string;
  endAdornment?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  defaultValue?: string;
  inputLabelProps?: any;
  disabled?: boolean;
  characterCounter?: number;
  sx?: SxProps;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      autoComplete = "off",
      error = false,
      helperText = "",
      endAdornment = false,
      multiline = false,
      minRows = 1,
      maxRows = 1,
      defaultValue = "",
      inputLabelProps = undefined,
      disabled = false,
      characterCounter,
      sx,
      ...props
    },
    ref
  ) => {

    //show password when textfield has endadornment
    const [hidePassword, setHidePassword] = useState(true);
    const handleClickHidePassword = () => setHidePassword(!hidePassword);
    const [inputLength, setInputLength] = useState(defaultValue.length);

    const handleChange = (event: any) => {
      setInputLength(event.target.value.length);
    }

    return (
      <TextField
        disabled={disabled}
        sx={sx}
        id={id}
        label={label}
        name={name}
        type={(endAdornment ? hidePassword ? "password" : type : type)}
        autoComplete={autoComplete}
        fullWidth
        defaultValue={defaultValue}
        error={error}
        helperText={helperText}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        InputLabelProps={inputLabelProps}
        InputProps={{
          endAdornment: (
            endAdornment ?
            (<InputAdornment position="end">
              <IconButton
                aria-label="toon wachtwoord"
                onClick={handleClickHidePassword}
              >
                {hidePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>) : (
              characterCounter ? 
              (<InputAdornment position="start" sx={{}}>
              <Typography>{inputLength}/{characterCounter}</Typography>
            </InputAdornment>) : null
            )
          ),
        }}
        onChangeCapture={handleChange}
        inputProps={{ maxLength: characterCounter}}
        ref={ref}
        {...props}
      />
    );
  }
);
