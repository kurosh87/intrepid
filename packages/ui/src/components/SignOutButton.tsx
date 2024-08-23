import React from 'react'
import { Button } from 'tamagui'
import { useAuth } from '../../../apps/next/contexts/AuthContext'

export const SignOutButton = () => {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Handle successful sign out (e.g., redirect to home page)
    } catch (error) {
      console.error('Sign out error:', error)
      // Handle error (e.g., show error message)
    }
  }

  return <Button onPress={handleSignOut}>Sign Out</Button>
}
