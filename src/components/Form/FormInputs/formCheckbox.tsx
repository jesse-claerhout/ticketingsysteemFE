import {
  Path,
  UseFormRegister,
} from "react-hook-form";
import { CheckboxInput, CheckboxProps } from "../Inputs/checkboxInput";

type FormCheckboxProps<TFormValues> = {
    name: Path<TFormValues>;
    register?: UseFormRegister<TFormValues>;
} & Omit<CheckboxProps, "name">

export const FormCheckbox = <TFormValues extends Record<string, unknown>>({
    name,
    register,
    ...props
  }: FormCheckboxProps<TFormValues>): JSX.Element => {
    return (
      <CheckboxInput
        name={name}
       {...props}
       {...(register && register(name))}
       />
    );
  };
  