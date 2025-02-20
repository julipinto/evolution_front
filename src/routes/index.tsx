import { lazy } from "react";
import { Route, Routes } from "react-router";

const AuthPage = lazy(() => import('../pages/auth'));
const PrivateRoutes = lazy(() => import('./private-routes'));
const Dash2 = lazy(() => import('../pages/dash/index2'));
const Dash = lazy(() => import('../pages/dash/index'));
const MainLayout = lazy(() => import('../components/main-layout'));

export function Router() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth" element={<AuthPage />} />

      {/* private routes */}
      <Route path="/" element={<PrivateRoutes />} >
        <Route path="/" element={<MainLayout />} >
          <Route path="/dash2" element={<Dash2 />} />
          <Route path="/" element={<Dash />} />
        </Route>
      </Route>
    </Routes>
  )
}