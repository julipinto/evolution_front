import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CssBaseline, FormControl, FormLabel, Stack, styled, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordField, TextField } from "../../components/hook-form";
import MuiCard from '@mui/material/Card';
import AppTheme from "../../components/theme/AppTheme";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthSchema = z.infer<typeof authSchema>;

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

  const methods = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

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
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormProvider {...methods}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  // color={emailError ? 'error' : 'primary'}
                  />
              </FormControl>
              {/* <TextField
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
              /> */}
              <PasswordField
                name="password"
                label="Password"
                type="password"
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
          </Box>
        </Card> 
      </SignInContainer>
    </AppTheme>
  )
}