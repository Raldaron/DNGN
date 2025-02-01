'use client'

import { useState } from 'react'
import {
  Box,
  Text,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  Center
} from '@chakra-ui/react'

interface StatCardProps {
  name: string
  initialValue?: number
  onChange?: (value: number) => void
}

export function StatCard({ name, initialValue = 1, onChange }: StatCardProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (valueString: string, valueNumber: number) => {
    setValue(valueNumber)
    onChange?.(valueNumber)
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={3}>
          <Text fontWeight="bold" fontSize="lg">{name}</Text>
          <Center w="100%" h="100px">
            <NumberInput
              value={value}
              min={1}
              max={10}
              size="lg"
              onChange={handleChange}
            >
              <NumberInputField textAlign="center" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  )
}