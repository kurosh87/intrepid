import React, { useState } from 'react'
import { supabase } from '../../apps/next/lib/supabase'
import { Input, Button, YStack } from 'tamagui'

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack space>
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        disabled={loading}
        onPress={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
      >
        {loading ? 'Loading' : 'Send magic link'}
      </Button>
    </YStack>
  )
}