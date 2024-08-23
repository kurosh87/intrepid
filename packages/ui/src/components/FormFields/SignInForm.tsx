import React from 'react'
import { FormWrapper } from '../FormWrapper'
import { TextField } from './TextField'
import { SubmitButton } from '../SubmitButton'
import { useAuth } from '../../../../apps/next/contexts/AuthContext'
import { YStack } from 'tamagui'

export const SignInForm = () => {
  const { signIn } = useAuth()

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await signIn(data.email, data.password)
    } catch (error) {
      console.error('Sign in error:', error)
      // Handle error (e.g., show error message)
    }
  }

  return (
    <FormWrapper>
      <FormWrapper.Body>
        <YStack space>
          <TextField
            label="Email"
            placeholder="Enter your email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="current-password"
          />
        </YStack>
      </FormWrapper.Body>
      <FormWrapper.Footer>
        <SubmitButton onPress={handleSubmit}>Sign In</SubmitButton>
      </FormWrapper.Footer>
    </FormWrapper>
  )
}
