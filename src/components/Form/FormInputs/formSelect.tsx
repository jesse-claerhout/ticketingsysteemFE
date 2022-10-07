import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Select, SelectProps } from "../Inputs/selectInput";
import { get } from "lodash";

export type FormSelectProps<TFormValues> = {
  name: Path<TFormValues>; //name from useform is not a string but a Path
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>; //TS documentation fielderrors; partial because errors can be empty
} & Omit<SelectProps, "name">; //we also want to use name from the input element

export const FormSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  ...props
}: FormSelectProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name); //library lodash to get the path
  const hasError = !!(errors && errorMessages);

  return (
    <div>
      <Select
        name={name}
        helperText={hasError ? errorMessages.message : ' '}
        error={hasError}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
};
