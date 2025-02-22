import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getFolds } from "../../api/skin-folds";
import { useBoolean } from '../../hooks/use-boolean';
import ModalSkinFoldRegister from './modal-skin-fold-register';

export default function SkinFolds() {
  const registerDialog = useBoolean(false)
  const skinFolds = useQuery({ queryKey: ['skin-folds'] , queryFn: getFolds })
    
  console.log(skinFolds.data?.data?.skin_folds)
  return <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography component="h2" variant="h6">
        OverView
      </Typography>
      <Button variant="outlined" startIcon={<AddCircleOutlineRoundedIcon />} onClick={registerDialog.onToggle}>
        Add Skin Fold
      </Button>
    </Box>

    <ModalSkinFoldRegister open={registerDialog.value} onClose={registerDialog.onFalse} />
  </Box>
}