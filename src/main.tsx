// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import { Router } from './routes';
import { HelmetProvider } from 'react-helmet-async'
import { StyledEngineProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StyledEngineProvider>
  </HelmetProvider>
)
