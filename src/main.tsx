import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Router } from './routes';
import { HelmetProvider } from 'react-helmet-async'
import { StyledEngineProvider } from '@mui/material/styles';
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StyledEngineProvider>
  </HelmetProvider>
)
