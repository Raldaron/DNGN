'use client'

import { useState } from 'react'
import {
  Text,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody
} from '@chakra-ui/react'

interface SkillCardProps {
  name: string
  stat: string
  initialValue?: number
  onChange?: (value: number) => void
}

export function SkillCard({ name, stat, initialValue = 0, onChange }: SkillCardProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (valueString: string, valueNumber: number) => {
    setValue(valueNumber)
    onChange?.(valueNumber)
  }

  return (
    <Card size="sm" height="120px">
      <CardBody p={2}>
        <VStack spacing={1} height="100%" justify="space-between">
          <Text 
            fontWeight="bold" 
            fontSize="xs" 
            textAlign="center" 
            noOfLines={2}
          >
            {name}
          </Text>
          <NumberInput
            value={value}
            min={0}
            max={10}
            size="xs"
            onChange={handleChange}
          >
            <NumberInputField 
              textAlign="center" 
              p={1}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text 
            fontSize="xs" 
            color="gray.600"
            noOfLines={1}
          >
            ({stat})
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}