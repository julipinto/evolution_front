import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogActions, DialogContentText } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../components/dialog';
import FormProvider from '../../components/form/form-provider';
import { DatePickerField, NumberField, TextField } from '../../components/hook-form';
import { SkinFoldSchema, skinFoldShape } from '../../types/skin-folds-type';

type Props = {
  open: boolean
  onClose: () => void
}

function ModalSkinFoldRegister({ open, onClose }: Props) {
  // const queryClient = useQueryClient()
  // const registerSkinFolds = useMutation({
  //   mutationFn: postFolds,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['skin-folds'] })
  //   },
  // })

  const methods = useForm<SkinFoldSchema>({
    resolver: zodResolver(skinFoldShape),
    defaultValues: {
      triceps: undefined,
      biceps: undefined,
      abdominal: undefined,
      subscapular: undefined,
      suprailiac: undefined,
      middle_axillary: undefined,
      calf: undefined,
      weight: undefined,
      measured_by: '',
      measured_at: new Date(),
    },
  })

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data)
    // await registerSkinFolds.mutateAsync(data)
    onClose()
  })

  return (
    <Dialog open={open} handleClose={onClose} title="Cadastrar dobra cutânea"> 
      <DialogContentText>
        A partir do cálculo de dobras, faremos uma análise do seu percentual de gordura.
      </DialogContentText>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid
          container
          spacing={2}
          columns={12}
          alignItems="flex-end"
        >
          <Grid size={{ xs: 6 }}>
            <NumberField
              name="triceps"
              label="Dobra tricipital"
              placeholder='123 (mm)'
            />
          </Grid>

          <Grid size={{ xs: 6 }}>        
            <NumberField
              name="biceps"
              label="Dobra bicipital"
              placeholder='123 (mm)'
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <NumberField
              name="abdominal"
              label="Dobra abdominal"
              placeholder='123 (mm)'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <NumberField
              name="supraliac"
              label="Dobra supra-ilíaca"
              placeholder='123 (mm)'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <NumberField
              name="subscapular"
              label="Dobra subescapular"
              placeholder='123 (mm)'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <NumberField
              name="suprailiac"
              label="Dobra supra-ilíaca"
              placeholder='123 (mm)'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <NumberField
              name="middle_axillary"
              label="Dobra axilar média"
              placeholder='123 (mm)'
              />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <NumberField
              name='weight'
              label='Peso'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name='measured_by'
              label='Profissional que realizou a medição'
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <DatePickerField
              name='measured_at'
              label='Data da medição'
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default memo(ModalSkinFoldRegister)