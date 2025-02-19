import { Box } from '@mui/material';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

// ----------------------------------------------------------------------

import { FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
};

export default function FormProvider<T extends FieldValues>({ children, onSubmit, methods }: Props<T>) {
  return (
    <Form {...methods}>
      <Box
        onSubmit={onSubmit}
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}>
        {children}
      </Box>
    </Form>
  )
}
