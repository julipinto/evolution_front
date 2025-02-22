import MUIDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode
  title?: string
}

export default function Dialog({ open, handleClose, children, title}: DialogProps) {
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          // component: 'form',
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        {children}
      </DialogContent>
    </MUIDialog>
  );
}
