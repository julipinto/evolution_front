import { alpha, Box, CssBaseline, Stack } from "@mui/material";
import { Outlet } from "react-router";
import AppTheme from "../theme/AppTheme";
import AppNavbar from "../theme/components/AppNavbar";
import Header from "../theme/components/Header";
import SideMenu from "../theme/components/SideMenu";
import { Suspense } from "react";
import LoadingContent from "../loading-content";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations
} from '../../components/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function MainLayout() {
  return (
    <AppTheme themeComponents={xThemeComponents}>
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
            <Suspense fallback={<LoadingContent />}>
              <Outlet />
            </Suspense>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}