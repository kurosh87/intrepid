import React from 'react'
import { YStack, Text, XStack, Button } from 'tamagui'

type Itinerary = {
  id: string
  name: string
  startDate: string
  endDate: string
  // Add more fields as needed
}

export const ItineraryDetail = ({ itinerary }: { itinerary: Itinerary }) => {
  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$8" fontWeight="bold">{itinerary.name}</Text>
      <XStack justifyContent="space-between">
        <Text fontSize="$5">Start: {itinerary.startDate}</Text>
        <Text fontSize="$5">End: {itinerary.endDate}</Text>
      </XStack>
      <Button>Add Activity</Button>
      {/* Add more details and functionality here */}
    </YStack>
  )
}