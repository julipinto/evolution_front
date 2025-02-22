import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogActions, DialogContentText } from '@mui/material';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '../../components/dialog';
import FormProvider from '../../components/form/form-provider';
import { SkinFoldSchema, skinFoldShape } from '../../types/skin-folds-type';
import { SkinFoldForm } from './form-skin-fold';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFolds } from '../../api/skin-folds';

type Props = {
  open: boolean
  onClose: () => void
}

function ModalSkinFoldRegister({ open, onClose }: Props) {
  const queryClient = useQueryClient()

  const registerSkinFolds = useMutation({
    mutationFn: postFolds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skin-folds'] })
      onClose();
    },
    onError: (error) => {
      console.error('Erro ao registrar as dobras cutâneas:', error);
    }
  })

  const methods = useForm<SkinFoldSchema>({
    resolver: zodResolver(skinFoldShape),
    // @ts-ignore
    defaultValues: {
      triceps: "",
      biceps: "",
      abdominal: "",
      subscapular: "",
      suprailiac: "",
      middle_axillary: "",
      thigh: "",
      calf: "",
      weight: "",
      measured_by: '',
      measured_at: new Date(),
    },
  })

  const { handleSubmit, formState: {isSubmitting} } = methods

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await registerSkinFolds.mutateAsync(data)
    } catch (error) {
      console.error('Erro ao registrar as dobras cutâneas:', error)
    }
  })

  return (
    <Dialog open={open} handleClose={onClose} title="Cadastrar dobra cutânea"> 
      <DialogContentText>
        A partir do cálculo de dobras, faremos uma análise do seu percentual de gordura.
      </DialogContentText>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <SkinFoldForm />
        <DialogActions>
          <Button
            onClick={onClose}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default memo(ModalSkinFoldRegister)