import { memo, forwardRef } from 'react'
// @mui
import Box from '@mui/material/Box'
//

// ----------------------------------------------------------------------
  import { Props } from 'simplebar-react'
  // @mui
  import { Theme, SxProps } from '@mui/material/styles'
import { StyledRootScrollbar, StyledScrollbar } from './styles';

  // ----------------------------------------------------------------------
export interface ScrollbarProps extends Props {
  children ?: React.ReactNode;
  sx ?: SxProps<Theme>;
}


const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  )
})

export default memo(Scrollbar)
