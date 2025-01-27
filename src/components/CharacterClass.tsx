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

interface Class {
  description: string
  buffs: { [key: string]: number }
  abilities: Array<{
    name: string
    description: string
    effect: string
    cost: number
    cooldown: string
  }>
}

interface ClassData {
  [key: string]: Class
}

interface CharacterClassProps {
  initialClass?: string
  onChange: (className: string) => void
}

const CharacterClass = ({ initialClass = '', onChange }: CharacterClassProps) => {
  const [classes, setClasses] = useState<ClassData>({})
  const [selectedClass, setSelectedClass] = useState(initialClass)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await fetch('/classes.json')
        const data = await response.json()
        setClasses(data)
      } catch (error) {
        console.error('Error loading classes:', error)
      }
    }
    loadClasses()
  }, [])

  const handleClassSelect = (className: string) => {
    setSelectedClass(className)
    onChange(className)
    onClose()
  }

  return (
    <FormControl>
      <FormLabel>Character Class</FormLabel>
      <Button onClick={onOpen} width="full">
        {selectedClass || 'Select a Class'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Your Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
              {Object.entries(classes).map(([className, classInfo]) => (
                <Box
                  key={className}
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleClassSelect(className)}
                  _hover={{ bg: 'gray.50' }}
                >
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{className}</Text>
                    <Text fontSize="sm">{classInfo.description}</Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      Buffs: {Object.entries(classInfo.buffs)
                        .map(([stat, value]) => `${stat} +${value}`)
                        .join(', ')}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      Abilities:
                    </Text>
                    {classInfo.abilities.map((ability, index) => (
                      <Box key={index} pl={4}>
                        <Text fontSize="sm">
                          <strong>{ability.name}</strong>: {ability.effect}
                        </Text>
                      </Box>
                    ))}
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

export default CharacterClass