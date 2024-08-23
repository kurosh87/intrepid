import React from 'react'
import { YStack, Text, Avatar } from 'tamagui'
import { useAuth } from '../../../apps/next/contexts/AuthContext'
import { SignOutButton } from './SignOutButton'

export const UserProfile = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <YStack space="$4" padding="$4">
      <Avatar circular size="$10">
        <Avatar.Image src={user.user_metadata.avatar_url || undefined} />
        <Avatar.Fallback backgroundColor="$blue10">
          {user.email?.charAt(0).toUpperCase()}
        </Avatar.Fallback>
      </Avatar>
      <Text fontSize="$6" fontWeight="bold">{user.email}</Text>
      <SignOutButton />
    </YStack>
  )
}
