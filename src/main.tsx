import { StyledEngineProvider } from '@mui/material/styles';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from "react-router";
import "./index.css";
import { Router } from './routes';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </StyledEngineProvider>
    </HelmetProvider>
  </QueryClientProvider>
)
