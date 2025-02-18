import { lazy } from "react";
import { Route, Routes } from "react-router";

const AuthPage = lazy(() => import('../pages/auth'));
const PrivateRoutes = lazy(() => import('./private-routes'));
const Dash = lazy(() => import('../pages/dash'));

export function Router() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth" element={<AuthPage />} />

      {/* private routes */}
      <Route path="/" element={<PrivateRoutes/>} >
        <Route path="/" element={<Dash />} />
      </Route>
    </Routes>
  )
}