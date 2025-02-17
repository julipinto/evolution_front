import { FormLabel, TextField, TextFieldProps } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  type?: HTMLInputTypeAttribute;
};

export default function RHFTextInput({ name, type = "text", ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormLabel htmlFor={name}>{props.label}</FormLabel>
          <TextField
            {...field}
            fullWidth
            type={type}
            error={!!error}
            helperText={error?.message}
            {...props} 
          />
        </>
      )}
    />
  );
}