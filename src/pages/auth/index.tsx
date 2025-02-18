import { Helmet } from 'react-helmet-async'
// sections
import Auth from './auth'

// ----------------------------------------------------------------------

export default function AuthPage() {
  return (
    <>
      <Helmet>
        <title> Login</title>
      </Helmet>

      <Auth />
    </>
  )
}
