import { createClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Input, Button, YStack, XStack, Text } from 'tamagui'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '')

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (email: string) => {
    try {
      setLoading(true)
      let result
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password: '' })
      } else {
        result = await supabase.auth.signInWithOtp({ email })
      }
      if (result.error) throw result.error
      alert(
        isSignUp
          ? 'Check your email to confirm your account!'
          : 'Check your email for the login link!'
      )
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack space>
      <Input placeholder="Your email" value={email} onChangeText={setEmail} />
      <Button
        disabled={loading}
        onPress={(e) => {
          e.preventDefault()
          handleAuth(email)
        }}
      >
        {loading ? 'Loading' : isSignUp ? 'Sign Up' : 'Send magic link'}
      </Button>
      <XStack>
        <Text>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</Text>
        <Button variant="outlined" onPress={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Log In' : 'Sign Up'}
        </Button>
      </XStack>
    </YStack>
  )
}
