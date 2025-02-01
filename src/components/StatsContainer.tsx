'use client'

import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { StatCard } from './StatCard'

interface StatGroupProps {
  title: string
  stats: { name: string; initialValue?: number }[]
  onStatChange?: (statName: string, value: number) => void
}

function StatGroup({ title, stats, onStatChange }: StatGroupProps) {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="xl" fontWeight="bold">{title}</Text>
      <SimpleGrid columns={1} spacing={4}>
        {stats.map((stat) => (
          <StatCard
            key={stat.name}
            name={stat.name}
            initialValue={stat.initialValue}
            onChange={(value) => onStatChange?.(stat.name, value)}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export function StatsContainer() {
  const handleStatChange = (statName: string, value: number) => {
    console.log(`${statName} changed to ${value}`)
  }

  const physicalStats = [
    { name: 'Strength', initialValue: 1 },
    { name: 'Dexterity', initialValue: 1 },
    { name: 'Stamina', initialValue: 1 }
  ]

  const mentalStats = [
    { name: 'Intelligence', initialValue: 1 },
    { name: 'Perception', initialValue: 1 },
    { name: 'Wit', initialValue: 1 }
  ]

  const socialStats = [
    { name: 'Charisma', initialValue: 1 },
    { name: 'Manipulation', initialValue: 1 },
    { name: 'Appearance', initialValue: 1 }
  ]

  return (
    <SimpleGrid columns={[1, 1, 3]} spacing={8} w="full">
      <StatGroup
        title="Physical"
        stats={physicalStats}
        onStatChange={handleStatChange}
      />
      <StatGroup
        title="Mental"
        stats={mentalStats}
        onStatChange={handleStatChange}
      />
      <StatGroup
        title="Social"
        stats={socialStats}
        onStatChange={handleStatChange}
      />
    </SimpleGrid>
  )
}