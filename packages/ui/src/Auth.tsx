import { createClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Input, Button, YStack, XStack, Text } from 'tamagui'

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '')

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleEmailAuth = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack space>
      <Input placeholder="Your email" value={email} onChangeText={setEmail} />
      <Button disabled={loading} onPress={handleEmailAuth}>
        {loading ? 'Loading' : 'Sign in with Email'}
      </Button>
      <Button disabled={loading} onPress={() => handleOAuthLogin('google')}>
        Sign in with Google
      </Button>
      <Button disabled={loading} onPress={() => handleOAuthLogin('apple')}>
        Sign in with Apple
      </Button>
    </YStack>
  )
}