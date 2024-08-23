import React, { useState } from 'react'
import { Fieldset, Input, Button, YStack, Text, Theme } from 'tamagui'
import { useAuth } from '../../../../apps/next/contexts/AuthContext'
import { FieldError } from '../FieldError'
import { Shake } from '../Shake'

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { resetPassword } = useAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await resetPassword(email)
      alert('Check your email for the password reset link!')
    } catch (error) {
      setError(error.message)

