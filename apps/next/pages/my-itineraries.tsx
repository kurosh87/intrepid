import { ProtectedRoute } from 'app/components/ProtectedRoute'
import { YStack, Text } from '@my/ui'
import { UserProfile } from 'app/components/UserProfile'
import { CreateItineraryForm } from 'app/components/CreateItineraryForm'
import { ItineraryList } from 'app/components/ItineraryList'
import { useState, useEffect } from 'react'
import { useAuth } from 'app/contexts/AuthContext'
import { getItineraries } from 'app/utils/supabase'

const MyItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchItineraries()
    }
  }, [user])

  const fetchItineraries = async () => {
    try {
      const data = await getItineraries(user.id)
      setItineraries(data)
    } catch (error) {
      console.error('Error fetching itineraries:', error)
      // Handle error (e.g., show error message)
    }
  }

  const handleItineraryCreated = (newItinerary) => {
    setItineraries([newItinerary, ...itineraries])
  }

  return (
    <YStack f={1} jc="flex-start" ai="stretch" padding="$4">
      <UserProfile />
      <Text fontSize="$6" fontWeight="bold" marginTop="$4">My Itineraries</Text>
      <CreateItineraryForm onItineraryCreated={handleItineraryCreated} />
      <ItineraryList itineraries={itineraries} />
    </YStack>
  )
}

export default ProtectedRoute(MyItinerariesPage)