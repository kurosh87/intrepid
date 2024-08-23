import React from 'react'
import { FormWrapper } from '../FormWrapper'
import { TextField } from './TextField'
import { SubmitButton } from '../SubmitButton'
import { useAuth } from '../../../../apps/next/contexts/AuthContext'
import { YStack } from 'tamagui'

export const SignUpForm = () => {
  const { signUp } = useAuth()

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await signUp(data.email, data.password)
      // Handle successful sign up (e.g., show success message, redirect)
    } catch (error) {
      console.error('Sign up error:', error)
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
            placeholder="Choose a password"
            secureTextEntry
            autoComplete="new-password"
          />
        </YStack>
      </FormWrapper.Body>
      <FormWrapper.Footer>
        <SubmitButton onPress={handleSubmit}>Sign Up</SubmitButton>
      </FormWrapper.Footer>
    </FormWrapper>
  )
}