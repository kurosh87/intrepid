import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function BypassLogin() {
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const bypassLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'TestPassword123!',
      })

      if (error) {
        console.error('Bypass login failed:', error.message)
        // Optionally, redirect to login page if bypass fails
        router.push('/sign-in')
      } else {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      }
    }

    bypassLogin()
  }, [router, supabase.auth])

  return <div>Logging in...</div>
}
