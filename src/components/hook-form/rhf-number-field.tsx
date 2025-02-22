import { NumberField } from '@base-ui-components/react/number-field';
import { FormControl, FormLabel, TextField, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

export default function RHFNumberInput({ name, label, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <NumberField.Root style={{ width: '100%' }}>
            <TextField
              {...field}
              id={name}
              variant={props.variant || 'outlined'}
              fullWidth
              error={!!error}
              helperText={error?.message || props.helperText}
              slotProps={{
                input: {
                  inputComponent: NumberField.Input, // Usa o NumberField.Input como componente de entrada
                  inputProps: {
                    fullWidth: true,
                  }
                }
              }}
              {...props}
            />
          </NumberField.Root>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}