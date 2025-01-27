'use client'

import { Input, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'

interface CharacterNameFieldProps {
  initialName?: string
  onChange?: (name: string) => void
}

export default function CharacterNameField({ initialName = '', onChange }: CharacterNameFieldProps) {
  const [name, setName] = useState(initialName)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    onChange?.(newName)
  }

  return (
    <FormControl>
      <FormLabel>Character Name</FormLabel>
      <Input
        value={name}
        onChange={handleChange}
        placeholder="Enter character name"
        size="md"
      />
    </FormControl>
  )
}