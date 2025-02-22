import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { useBoolean } from '../../hooks/use-boolean';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content' }}
    >
      {label ? `${label}` : 'Pick a date'}
    </Button>
  );
}

type RHFDatePickerProps = {
  name: string;
  label?: string;
};

export default function RHFDatePicker({ name, label }: RHFDatePickerProps) {
  const { control } = useFormContext();
  const open = useBoolean(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs().format('YYYY-MM-DD')} // Define o valor padrão como hoje
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              label={field.value ? dayjs(field.value).format('MMM DD, YYYY') : null}
              onChange={(newValue) => {
                // Retorna a data no formato ISO (YYYY-MM-DD)
                field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
              }}
              slots={{ field: ButtonField }}
              slotProps={{
                field: { setOpen: open.onToggle },
                nextIconButton: { size: 'small' },
                previousIconButton: { size: 'small' },
              }}
              open={open.value}
              onClose={open.onFalse}
              onOpen={open.onTrue}
              views={['day', 'month', 'year']}
            />
          </LocalizationProvider>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}