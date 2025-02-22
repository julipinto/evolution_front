import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getFolds } from "../../api/skin-folds";
import { useBoolean } from '../../hooks/use-boolean';
import FatAndLeanMassChart from './chart-fat-and-lean-mass';
import ModalSkinFoldRegister from './modal-skin-fold-register';
import AnthropometricFoldsTable from './table-measurements';
import StatsTable from './table-stats';


export default function SkinFolds() {
  const registerDialog = useBoolean(false)
  const skinFolds = useQuery({ queryKey: ['skin-folds'] , queryFn: getFolds })
    
  return <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography component="h2" variant="h6">
        OverView
      </Typography>
      <Button variant="outlined" startIcon={<AddCircleOutlineRoundedIcon />} onClick={registerDialog.onToggle}>
        Add Skin Fold
      </Button>
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <FatAndLeanMassChart skinFolds={skinFolds.data?.skin_folds} />
    </Box>

    <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
      <Typography component="h2" variant="h6">
        Stats
      </Typography>
      <StatsTable skinFolds={skinFolds.data?.skin_folds} />
    </Stack>

    <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
      <Typography component="h2" variant="h6">
        Medidas antropométricas
      </Typography>
      <AnthropometricFoldsTable skinFolds={skinFolds.data?.skin_folds} />
    </Stack>

    <ModalSkinFoldRegister open={registerDialog.value} onClose={registerDialog.onFalse} />
  </Box>
}