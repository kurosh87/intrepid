import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { YStack, Text, XStack, Button, Spinner } from '@my/ui'
import { ItineraryDetail } from 'app/components/ItineraryDetail'
import { getItinerary } from 'app/utils/supabase'
import { ProtectedRoute } from 'app/components/ProtectedRoute'
import { ItineraryActivities } from 'app/components/ItineraryActivities'
import { WeatherForecast } from 'app/components/WeatherForecast'
import { ItineraryMap } from 'app/components/ItineraryMap'
import { BudgetTracker } from 'app/components/BudgetTracker'
import { PackingList } from 'app/components/PackingList'
import { CollaboratorsList } from 'app/components/CollaboratorsList'
import { DayByDayView } from 'app/components/DayByDayView'
import { CurrencyConverter } from 'app/components/CurrencyConverter'

const ItineraryDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchItinerary(id as string)
    }
  }, [id])

  const fetchItinerary = async (itineraryId: string) => {
    try {
      const data = await getItinerary(itineraryId)
      setItinerary(data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (id) {
      setLoading(true)
      setError(null)
      fetchItinerary(id as string)
    }
  }

  const handleBack = () => {
    router.push('/my-itineraries')
  }

  if (loading) return <Spinner size="large" />
  if (error) return (
    <YStack space>
      <Text>Error loading itinerary: {error.message}</Text>
      <Button onPress={() => fetchItinerary(id as string)}>Retry</Button>
    </YStack>
  )
  if (!itinerary) return <Text>Itinerary not found</Text>

  return (
    <YStack f={1} jc="flex-start" ai="stretch">
      <XStack justifyContent="space-between" padding="$4">
        <Button onPress={handleBack}>Back to List</Button>
        <Button onPress={handleRefresh}>Refresh</Button>
      </XStack>
      <YStack space>
        <ItineraryDetail itinerary={itinerary} />
        <ItineraryActivities itineraryId={itinerary.id} />
        <WeatherForecast startDate={itinerary.startDate} endDate={itinerary.endDate} location={itinerary.location} />
        <ItineraryMap itineraryId={itinerary.id} />
        <BudgetTracker itineraryId={itinerary.id} />
        <PackingList itineraryId={itinerary.id} />
        <CollaboratorsList itineraryId={itinerary.id} />
        <DayByDayView itineraryId={itinerary.id} />
        <CurrencyConverter baseCurrency={itinerary.baseCurrency} destinationCurrency={itinerary.destinationCurrency} />
      </YStack>
    </YStack>
  )
}

export default ProtectedRoute(ItineraryDetailPage)