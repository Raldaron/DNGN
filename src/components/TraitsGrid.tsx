'use client'

import {
  Box,
  SimpleGrid,
  Input,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { TraitCard } from './TraitCard'

interface Trait {
  name: string
  description: string
  effect?: string
}

interface TraitsData {
  Traits: {
    [key: string]: Trait
  }
}

export function TraitsGrid() {
  const [traits, setTraits] = useState<TraitsData>({ Traits: {} })
  const [searchTerm, setSearchTerm] = useState('')
  const [traitNotes, setTraitNotes] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const loadTraits = async () => {
      try {
        const response = await fetch('/traits.json')
        const data = await response.json()
        setTraits(data)
        
        // Initialize trait notes from localStorage if they exist
        const savedNotes = localStorage.getItem('traitNotes')
        if (savedNotes) {
          setTraitNotes(JSON.parse(savedNotes))
        }
      } catch (error) {
        console.error('Error loading traits:', error)
      }
    }
    loadTraits()
  }, [])

  const handleUpdateTraitNotes = (traitName: string, notes: string) => {
    const updatedNotes = {
      ...traitNotes,
      [traitName]: notes
    }
    setTraitNotes(updatedNotes)
    localStorage.setItem('traitNotes', JSON.stringify(updatedNotes))
  }

  const filteredTraits = Object.entries(traits.Traits || {}).filter(([name, trait]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trait.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <VStack spacing={6} align="stretch" p={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="🔍"
        />
        <Input
          placeholder="Search traits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {filteredTraits.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No traits found matching your search.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {filteredTraits.map(([key, trait]) => (
            <TraitCard
              key={key}
              trait={{
                ...trait,
                description: traitNotes[trait.name] || trait.description
              }}
              onUpdate={handleUpdateTraitNotes}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}