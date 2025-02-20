import { alpha, Box, CssBaseline, Stack } from "@mui/material";
import { Outlet } from "react-router";
import AppTheme from "../theme/AppTheme";
import AppNavbar from "../theme/components/AppNavbar";
import Header from "../theme/components/Header";
import SideMenu from "../theme/components/SideMenu";

export default function MainLayout() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}