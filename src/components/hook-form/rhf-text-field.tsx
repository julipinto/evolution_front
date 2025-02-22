import { FormControl, FormLabel, TextField, TextFieldProps } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  type?: HTMLInputTypeAttribute;
};

export default function RHFTextInput({ name, type = "text", label, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            type={type}
            error={!!error}
            helperText={error?.message}
            {...props} 
          />
        </FormControl>
      )}
    />
  );
}