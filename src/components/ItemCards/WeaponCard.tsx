import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
  Badge,
  Flex,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  HStack
} from '@chakra-ui/react';
import { WeaponItem } from '../../types';

interface WeaponCardProps {
  item: WeaponItem;
  onClick?: () => void;
}

export const WeaponCard = ({ item, onClick }: WeaponCardProps) => {
  const getRarityScheme = (rarity: string) => {
    switch(rarity.toLowerCase()) {
      case 'ordinary': return 'gray';
      case 'common': return 'gray';
      case 'uncommon': return 'green';
      case 'rare': return 'blue';
      case 'epic': return 'purple';
      case 'legendary': return 'orange';
      default: return 'gray';
    }
  };

  const getDamageTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'slashing': return 'red';
      case 'piercing': return 'blue';
      case 'bludgeoning': return 'orange';
      case 'fire': return 'red';
      case 'cold': return 'blue';
      case 'lightning': return 'yellow';
      case 'acid': return 'green';
      case 'force': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Card 
      h="full" 
      _hover={{ shadow: 'md' }} 
      transition="all 0.2s"
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <CardBody>
        <VStack align="start" spacing={3}>
          <Flex justify="space-between" w="full" align="center">
            <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
            <Badge colorScheme={getRarityScheme(item.rarity)}>
              {item.rarity}
            </Badge>
          </Flex>
          
          <Text fontSize="sm" color="gray.600">{item.description}</Text>
          
          <Divider />
          
          <SimpleGrid columns={2} spacing={3} w="full">
            <Stat size="sm">
              <StatLabel fontSize="xs">Weapon Type</StatLabel>
              <StatNumber fontSize="sm">{item.weaponType}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel fontSize="xs">Damage</StatLabel>
              <StatNumber fontSize="sm">{item.damageAmount}</StatNumber>
              <Badge colorScheme={getDamageTypeColor(item.damageType)} mt={1}>
                {item.damageType}
              </Badge>
            </Stat>
          </SimpleGrid>

          <Stack direction="row" wrap="wrap" spacing={2}>
            <Badge variant="outline" colorScheme={item.meleeRanged === 'Melee' ? 'red' : 'blue'}>
              {item.meleeRanged}
            </Badge>
            <Badge variant="outline" colorScheme={item.magicNonMagical === 'Magical' ? 'purple' : 'gray'}>
              {item.magicNonMagical}
            </Badge>
            <Badge variant="outline">
              {item.handsRequired}
            </Badge>
          </Stack>

          {Object.keys(item.statBonus).length > 0 && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Stat Bonuses:</Text>
              {Object.entries(item.statBonus).map(([stat, bonus]) => (
                <Text key={stat} fontSize="sm">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{bonus}
                </Text>
              ))}
            </VStack>
          )}

          {Object.keys(item.skillBonus).length > 0 && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Skill Bonuses:</Text>
              {Object.entries(item.skillBonus).map(([skill, bonus]) => (
                <Text key={skill} fontSize="sm">
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}: +{bonus}
                </Text>
              ))}
            </VStack>
          )}

          {item.abilities.length > 0 && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Abilities:</Text>
              {item.abilities.map((ability) => (
                <Text key={ability} fontSize="sm">• {ability}</Text>
              ))}
            </VStack>
          )}

          {Object.keys(item.spellsGranted).length > 0 && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Spells Granted:</Text>
              {Object.entries(item.spellsGranted).map(([spell, info]) => (
                <Text key={spell} fontSize="sm">• {spell}</Text>
              ))}
            </VStack>
          )}

          {(item.hpBonus > 0 || item.mpBonus > 0) && (
            <HStack spacing={4}>
              {item.hpBonus > 0 && (
                <Text fontSize="sm">HP Bonus: +{item.hpBonus}</Text>
              )}
              {item.mpBonus > 0 && (
                <Text fontSize="sm">MP Bonus: +{item.mpBonus}</Text>
              )}
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};