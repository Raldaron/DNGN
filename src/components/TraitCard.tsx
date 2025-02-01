'use client'

import {
  Card,
  CardBody,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

interface Trait {
  name: string
  description: string
  effect?: string
}

interface TraitCardProps {
  trait: Trait
  onUpdate?: (traitName: string, notes: string) => void
}

export function TraitCard({ trait, onUpdate }: TraitCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    onUpdate?.(trait.name, notes)
    onClose()
  }

  return (
    <>
      <Card 
        size="sm" 
        height="150px" 
        cursor="pointer" 
        onClick={onOpen}
        _hover={{ shadow: 'md' }}
      >
        <CardBody>
          <VStack spacing={2} align="start">
            <Text fontWeight="bold" fontSize="md" noOfLines={1}>
              {trait.name}
            </Text>
            <Text fontSize="sm" color="gray.600" noOfLines={4}>
              {trait.description}
            </Text>
          </VStack>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{trait.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text fontSize="sm" width="100%">
                {trait.description}
              </Text>
              {trait.effect && (
                <Text fontSize="sm" width="100%" color="blue.600">
                  Effect: {trait.effect}
                </Text>
              )}
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this trait..."
                size="sm"
                rows={4}
              />
              <Button colorScheme="blue" onClick={handleSave} width="100%">
                Save Notes
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}