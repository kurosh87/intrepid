import React, { useState, useEffect } from 'react'
import { YStack, Text, Input, Button, XStack } from 'tamagui'

type CurrencyConverterProps = {
  baseCurrency: string
  destinationCurrency: string
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ baseCurrency, destinationCurrency }) => {
  const [amount, setAmount] = useState('')
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

  useEffect(() => {
    // Fetch the exchange rate from an API
    // This is a placeholder for the actual API call
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        const data = await response.json()
        setExchangeRate(data.rates[destinationCurrency])
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
      }
    }

    fetchExchangeRate()
  }, [baseCurrency, destinationCurrency])

  const handleConvert = () => {
    if (exchangeRate && amount) {
      const converted = parseFloat(amount) * exchangeRate
      setConvertedAmount(converted)
    }
  }

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Currency Converter</Text>
      <XStack space="$2">
        <Input
          placeholder={`Enter amount in ${baseCurrency}`}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button onPress={handleConvert}>Convert</Button>
      </XStack>
      {convertedAmount && (
        <Text>
          {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {destinationCurrency}
        </Text>
      )}
    </YStack>
  )
}
