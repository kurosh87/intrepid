import React, { useState, useEffect } from 'react'
import { YStack, Text, Input, Button, XStack, Checkbox } from 'tamagui'

type PackingItem = {
  id: string
  name: string
  packed: boolean
}

type PackingListProps = {
  itineraryId: string
}

export const PackingList: React.FC<PackingListProps> = ({ itineraryId }) => {
  const [items, setItems] = useState<PackingItem[]>([])
  const [newItemName, setNewItemName] = useState('')

  useEffect(() => {
    // Fetch packing list from your backend or local storage
    // This is a placeholder for the actual data fetching logic
    const fetchPackingList = async () => {
      // const response = await fetch(`/api/packing-list/${itineraryId}`);
      // const data = await response.json();
      // setItems(data);
    }

    fetchPackingList()
  }, [itineraryId])

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: PackingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        packed: false
      }
      setItems([...items, newItem])
      setNewItemName('')
      // Here you would also save the new item to your backend
    }
  }

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ))
    // Here you would also update the item in your backend
  }

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Packing List</Text>
      <XStack space="$2">
        <Input
          flex