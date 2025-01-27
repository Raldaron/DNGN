'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Grid,
  VStack,
  FormControl,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react'

interface Race {
  description: string
  buffs: { [key: string]: number }
  abilities: Array<{
    name: string
    description: string
    effect: string
    abilityPointCost: number
    cooldown: string
  }>
}

interface RaceData {
  [key: string]: Race
}

interface CharacterRaceProps {
  initialRace?: string
  onChange: (race: string) => void
}

const CharacterRace = ({ initialRace = '', onChange }: CharacterRaceProps) => {
  const [races, setRaces] = useState<RaceData>({})
  const [selectedRace, setSelectedRace] = useState(initialRace)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const loadRaces = async () => {
      try {
        const response = await fetch('/races.json')
        const data = await response.json()
        setRaces(data)
      } catch (error) {
        console.error('Error loading races:', error)
      }
    }
    loadRaces()
  }, [])

  const handleRaceSelect = (raceName: string) => {
    setSelectedRace(raceName)
    onChange(raceName)
    onClose()
  }

  return (
    <FormControl>
      <FormLabel>Character Race</FormLabel>
      <Button onClick={onOpen} width="full">
        {selectedRace || 'Select a Race'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Your Race</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
              {Object.entries(races).map(([raceName, raceInfo]) => (
                <Box
                  key={raceName}
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleRaceSelect(raceName)}
                  _hover={{ bg: 'gray.50' }}
                >
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{raceName}</Text>
                    <Text fontSize="sm">{raceInfo.description}</Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      Buffs: {Object.entries(raceInfo.buffs)
                        .map(([stat, value]) => `${stat} +${value}`)
                        .join(', ')}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormControl>
  )
}

export default CharacterRace