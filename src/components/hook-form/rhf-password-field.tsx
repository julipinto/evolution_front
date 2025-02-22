import { FormControl, FormLabel, IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useBoolean } from "../../hooks/use-boolean";
import Iconify from "../iconify";

type Props = TextFieldProps & {
  name: string;
};

export default function RHFPasswordField({ name, label, ...props }: Props) {
  const { control } = useFormContext();
  const show = useBoolean(false);

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
            autoComplete="current-password"
            type={show.value ? "text" : "password"}
            error={!!error}
            helperText={error?.message}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={show.onToggle} edge="end">
                    <Iconify icon={show.value ? "bi:eye-slash" : "bi:eye"} />
                  </IconButton>
                </InputAdornment>,
              }
            }}
            {...props}
          />
        </FormControl>
      )}
    />
  );
}