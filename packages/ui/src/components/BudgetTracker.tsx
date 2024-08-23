import React, { useState, useEffect } from 'react'
import { YStack, Text, Input, Button } from 'tamagui'

type Expense = {
  id: string
  description: string
  amount: number
  category: string
}

type BudgetTrackerProps = {
  itineraryId: string
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ itineraryId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' })

  useEffect(() => {
    // Fetch expenses from your backend or local storage
    // This is a placeholder for the actual data fetching logic
    const fetchExpenses = async () => {
      // const response = await fetch(`/api/expenses/${itineraryId}`);
      // const data = await response.json();
      // setExpenses(data);
    }

    fetchExpenses()
  }, [itineraryId])

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category
      }
      setExpenses([...expenses, expense])
      setNewExpense({ description: '', amount: '', category: '' })
      // Here you would also save the new expense to your backend
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Budget Tracker</Text>
      <YStack space="$2">
        <Input
          placeholder="Description"
          value={newExpense.description}
          onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
        />
        <Input
          placeholder="Amount"
          value={newExpense.amount}
          onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
          keyboardType="numeric"
        />
        <Input
          placeholder="Category"
          value={newExpense.category}
          onChangeText={(text) => setNewExpense({ ...newExpense, category: text })}
        />
        <Button onPress={addExpense}>Add Expense</Button>
      </YStack>
      <Text fontSize="$5" fontWeight="bold">Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      {expenses.map((expense) => (
        <YStack key={expense.id} padding="$2">
          <Text>{expense.description} - ${expense.amount.toFixed(2)}</Text>
          <Text fontSize="$3">{expense.category}</Text>
        </YStack>
      ))}
    </YStack>
  )
}