'use client'

import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

interface BasePointFieldProps {
  label: string
  initialValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

function BasePointField({
  label,
  initialValue = 0,
  onChange,
  min = 0,
  max = 999,
  step = 1
}: BasePointFieldProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (valueString: string, valueNumber: number) => {
    setValue(valueNumber)
    onChange?.(valueNumber)
  }

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export function HPField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="HP"
      initialValue={100}
      onChange={onChange}
      max={9999}
    />
  )
}

export function MPField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="Mana"
      initialValue={100}
      onChange={onChange}
      max={9999}
    />
  )
}

export function APField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="AP"
      initialValue={0}
      onChange={onChange}
      max={100}
    />
  )
}

export function StylePointsField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="Style"
      initialValue={0}
      onChange={onChange}
      max={100}
    />
  )
}

export function SkillPointsField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="Skills"
      initialValue={0}
      onChange={onChange}
      max={100}
    />
  )
}

export function AttributePointsField({ onChange }: { onChange?: (value: number) => void }) {
  return (
    <BasePointField
      label="Attributes"
      initialValue={0}
      onChange={onChange}
      max={100}
    />
  )
}