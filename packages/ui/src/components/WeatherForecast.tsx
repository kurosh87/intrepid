import React, { useEffect, useState } from 'react'
import { YStack, Text, Spinner } from 'tamagui'

type WeatherData = {
  date: string
  temperature: number
  description: string
}

type WeatherForecastProps = {
  startDate: string
  endDate: string
  location: string
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ startDate, endDate, location }) => {
  const [forecast, setForecast] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace this with actual API call to a weather service
        const response = await fetch(`https://api.weatherservice.com/forecast?location=${location}&start=${startDate}&end=${endDate}`)
        const data = await response.json()
        setForecast(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [startDate, endDate, location])

  if (loading) return <Spinner />
  if (error) return <Text>{error}</Text>

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Weather Forecast</Text>
      {forecast.map((day) => (
        <YStack key={day.date} padding="$2">
          <Text>{day.date}</Text>
          <Text>{day.temperature}°C</Text>
          <Text>{day.description}</Text>
        </YStack>
      ))}
    </YStack>
  )
}