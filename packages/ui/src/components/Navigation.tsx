import React from 'react'
import { XStack, Button } from 'tamagui'
import { useRouter } from 'next/router'
import { useAuth } from '../../../apps/next/contexts/AuthContext'

export const Navigation = () => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <XStack space justifyContent="space-between" padding="$4">
      <Button onPress={() => router.push('/')}>Home</Button>
      {user ? (
        <Button onPress={() => router.push('/my-itineraries')}>My Itineraries</Button>
      ) : (
        <Button onPress={() => router.push('/auth')}>Sign In</Button>
      )}
    </XStack>
  )
}
