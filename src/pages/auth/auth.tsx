import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CssBaseline, Stack, styled, Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useForm } from "react-hook-form";

import { login } from "../../api/auth";
import FormProvider from "../../components/form/form-provider";
import { PasswordField, TextField } from "../../components/hook-form";
import AppTheme from "../../components/theme/AppTheme";
import { useAuthStore } from "../../store/auth-store";
import { AuthSchema, authShape } from "../../types/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Auth(props: { disableCustomTheme?: boolean }) {
  const store = useAuthStore(state => state);
  const navigate = useNavigate();

  const methods = useForm<AuthSchema>({
    resolver: zodResolver(authShape),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, reset } = methods;	

  const onSubmit = handleSubmit(async (data: AuthSchema) => { 
    try {
      const response = await login(data);
      store.login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  })

  useEffect(() => {
    if (store.authToken) {
      navigate('/');
    }
  }, [store.authToken, navigate])

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Login
            </Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <TextField
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                label="Email"
                autoFocus
                required
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="******"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Entrar
              </Button>
            </FormProvider>
        </Card> 
      </SignInContainer>
    </AppTheme>
  )
}