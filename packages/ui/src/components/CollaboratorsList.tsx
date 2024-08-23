import React, { useState, useEffect } from 'react'
import { YStack, Text, Input, Button, XStack, Avatar } from 'tamagui'

type Collaborator = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

type CollaboratorsListProps = {
  itineraryId: string
}

export const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ itineraryId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('')

  useEffect(() => {
    // Fetch collaborators from your backend
    // This is a placeholder for the actual data fetching logic
    const fetchCollaborators = async () => {
      // const response = await fetch(`/api/collaborators/${itineraryId}`);
      // const data = await response.json();
      // setCollaborators(data);
    }

    fetchCollaborators()
  }, [itineraryId])

  const addCollaborator = () => {
    if (newCollaboratorEmail.trim()) {
      // Here you would typically send an invitation to the email address
      // and add the collaborator to your backend
      // This is a placeholder for that logic
      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        name: 'New Collaborator',
        email: newCollaboratorEmail.trim(),
      }
      setCollaborators([...collaborators, newCollaborator])
      setNewCollaboratorEmail('')
    }
  }

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Collaborators</Text>
      <XStack space="$2">
        <Input
          flex={1}
          placeholder="Add collaborator by email"
          value={newCollaboratorEmail}
          onChangeText={setNewCollaboratorEmail}
        />
        <Button onPress={addCollaborator}>Invite</Button>
      </XStack>
      {collaborators.map((collaborator) => (
        <XStack key={collaborator.id} space="$2" alignItems="center">
          <Avatar circular size="$4">
            <Avatar