import { Path, UseFormRegister } from "react-hook-form";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { TextDetailInformation } from "../../TextInformation/textDetailInformation";

export type FormButtonProps<TFormValues> = {
  name: Path<TFormValues>; //name from useform is not a string but a Path
  register?: UseFormRegister<TFormValues>;
};

export const FormUpload = <TFormValues extends Record<string, unknown>>({
  name,
  register,
}: FormButtonProps<TFormValues>): JSX.Element => {

  const [imageFileNames, setImageFileNames] = useState<string[]>([]);

  const handleImageFileNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames: React.SetStateAction<string[]> = [];
    files.map((file) => fileNames.push(file.name));
    setImageFileNames(fileNames);
  };

  return (
    <label htmlFor="contained-button-file">
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChangeCapture={handleImageFileNames}
        name={name}
        {...(register && register(name))}
      />
      <Button variant="contained" component="span" sx={{float: {xs: "left", sm: "right"}, mr: {xs: 1, sm: 0}, ml: {xs: 0, sm: 1}}}>
        Upload Foto's
      </Button>
      <Box >
      <TextDetailInformation
        label={
          imageFileNames.length +
          (imageFileNames.length === 1
            ? " Bestand gekozen"
            : " Bestanden gekozen")
        }
        fontSize="normal"
        textInformation={imageFileNames.join("\r\n")}
      />
      </Box>
    </label>
  );
};
