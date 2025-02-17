import { lazy } from "react";
import { Route, Routes } from "react-router";

const AuthPage = lazy(() => import('../pages/auth'));

export function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}