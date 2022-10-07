import { createElement, ReactElement } from "react";
import {
  DeepPartial,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface IFormProps<FormValues> extends UseFormProps {
  defaultValues?: UnpackNestedValue<DeepPartial<FormValues>>;
  onSubmit: SubmitHandler<FormValues>;
  id?: string;
}

export function Form<FormValues>({
  defaultValues,
  children,
  onSubmit,
  id,
}: IFormProps<FormValues> & { children: ReactElement | ReactElement[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, mode: "onBlur" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={id}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    errors,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
