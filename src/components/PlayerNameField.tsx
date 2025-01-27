'use client'

import { Input, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'

interface PlayerNameFieldProps {
  initialName?: string
  onChange?: (name: string) => void
}

export default function PlayerNameField({ initialName = '', onChange }: PlayerNameFieldProps) {
  const [name, setName] = useState(initialName)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    onChange?.(newName)
  }

  return (
    <FormControl>
      <FormLabel>Player Name</FormLabel>
      <Input
        value={name}
        onChange={handleChange}
        placeholder="Enter player name"
        size="md"
      />
    </FormControl>
  )
}