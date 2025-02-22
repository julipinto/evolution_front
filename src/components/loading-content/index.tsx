import { Box, BoxProps, CircularProgress } from "@mui/material";

export default function LoadingContent({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        py: 50,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx
      }}
      {...other}
    >
      <CircularProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  )
}