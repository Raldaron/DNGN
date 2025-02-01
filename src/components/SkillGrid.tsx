'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import { SkillCard } from './SkillCard'

interface Skill {
  name: string
  stat: string
  initialValue?: number
}

const SKILLS_DATA: Skill[] = [
  { name: 'Abjuration', stat: 'Intelligence' },
  { name: 'Acrobatics', stat: 'Dexterity' },
  { name: 'Alchemy', stat: 'Intelligence' },
  { name: 'Animal Ken', stat: 'Charisma' },
  { name: 'Arcana', stat: 'Intelligence' },
  { name: 'Archery', stat: 'Dexterity' },
  { name: 'Artillery', stat: 'Intelligence' },
  { name: 'Athletics', stat: 'Strength' },
  { name: 'Awareness', stat: 'Perception' },
  { name: 'Block', stat: 'Stamina' },
  { name: 'Conjuration', stat: 'Intelligence' },
  { name: 'Deception', stat: 'Manipulation' },
  { name: 'Detect Trap', stat: 'Perception' },
  { name: 'Disguise', stat: 'Appearance' },
  { name: 'Divination', stat: 'Intelligence' },
  { name: 'Dodge', stat: 'Dexterity' },
  { name: 'Insight', stat: 'Perception' },
  { name: 'Enchantment', stat: 'Intelligence' },
  { name: 'Endurance', stat: 'Stamina' },
  { name: 'Engineering', stat: 'Intelligence' },
  { name: 'Evocation', stat: 'Intelligence' },
  { name: 'Explosives Handling', stat: 'Intelligence' },
  { name: 'Firearms', stat: 'Dexterity' },
  { name: 'Hold Breath', stat: 'Stamina' },
  { name: 'Illusion', stat: 'Intelligence' },
  { name: 'Intimidation', stat: 'Strength' },
  { name: 'Investigation', stat: 'Intelligence' },
  { name: 'Lore', stat: 'Intelligence' },
  { name: 'Medicine', stat: 'Intelligence' },
  { name: 'Melee', stat: 'Strength' },
  { name: 'Nature', stat: 'Intelligence' },
  { name: 'Necromancy', stat: 'Intelligence' },
  { name: 'Parry', stat: 'Dexterity' },
  { name: 'Performance', stat: 'Charisma' },
  { name: 'Persuasion', stat: 'Charisma' },
  { name: 'Resilience', stat: 'Stamina' },
  { name: 'Scrounge', stat: 'Perception' },
  { name: 'Seduction', stat: 'Appearance' },
  { name: 'Sense Deception', stat: 'Perception' },
  { name: 'Sleight of Hand', stat: 'Dexterity' },
  { name: 'Stealth', stat: 'Dexterity' },
  { name: 'Survival', stat: 'Intelligence' },
  { name: 'Tactics', stat: 'Intelligence' },
  { name: 'Tracking', stat: 'Perception' },
  { name: 'Transmutation', stat: 'Intelligence' }
]

export function SkillGrid() {
  const handleSkillChange = (skillName: string, value: number) => {
    console.log(`${skillName} changed to ${value}`)
  }

  return (
    <Box p={2}>
      <SimpleGrid columns={[2, 3, 5, 6]} spacing={2}>
        {SKILLS_DATA.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            stat={skill.stat}
            initialValue={skill.initialValue}
            onChange={(value) => handleSkillChange(skill.name, value)}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}