import React from 'react'
import { YStack, Text, Button, XStack } from 'tamagui'

type Itinerary = {
  id: string
  name: string
  startDate: string
  endDate: string
}

export const ItineraryList = ({ itineraries }: { itineraries: Itinerary[] }) => {
  return (
    <YStack space="$4">
      {itineraries.map((itinerary) => (
        <XStack key={itinerary.id} justifyContent="space-between" alignItems="center">
          <YStack>
            <Text fontSize="$5" fontWeight="bold">{itinerary.name}</Text>
            <Text fontSize="$3">{itinerary.startDate} - {itinerary.endDate}</Text>
          </YStack>
          <Button size="$3">View</Button>
        </XStack>
      ))}
    </YStack>
  )
}
