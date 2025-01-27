import { useState } from 'react'
import { 
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

interface CharacterLevelProps {
  initialLevel?: number
  onChange: (level: number) => void
  min?: number
  max?: number
}

const CharacterLevel = ({ 
  initialLevel = 1, 
  onChange, 
  min = 1, 
  max = 20 
}: CharacterLevelProps) => {
  const [level, setLevel] = useState(initialLevel)

  const handleChange = (valueString: string, valueNumber: number) => {
    setLevel(valueNumber)
    onChange(valueNumber)
  }

  return (
    <FormControl>
      <FormLabel>Character Level</FormLabel>
      <NumberInput
        value={level}
        min={min}
        max={max}
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

export default CharacterLevel