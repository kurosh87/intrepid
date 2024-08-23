import React, { useState } from 'react'
import { YStack, Input, Button, Text } from 'tamagui'
import { createItinerary } from '../utils/supabase'
import { useAuth } from '../../../apps/next/contexts/AuthContext'

export const CreateItineraryForm = ({ onItineraryCreated }) => {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { user } = useAuth()

  const handleSubmit = async () => {
    try {
      const newItinerary = await createItinerary(user.id, { name, startDate, endDate })
      onItineraryCreated(newItinerary)
      setName('')
      setStartDate('')
      setEndDate('')
    } catch (error) {
      console.error('Error creating itinerary:', error)
      // Handle error (e.g., show error message)
    }
  }

  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">Create New Itinerary</Text>
      <Input
        placeholder="Itinerary Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Start Date"
        value={startDate}
        onChangeText={setStartDate}
      />
      <Input
        placeholder="End Date"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Button onPress={handleSubmit}>Create Itinerary</Button>
    </YStack>
  )
}