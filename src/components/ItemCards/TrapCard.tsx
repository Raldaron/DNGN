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
  Box
} from '@chakra-ui/react';
import { TrapItem } from '../../types';

interface TrapCardProps {
  item: TrapItem;
  onClick?: () => void;
}

export const TrapCard = ({ item, onClick }: TrapCardProps) => {
  const getRarityScheme = (rarity: string) => {
    switch(rarity.toLowerCase()) {
      case 'common': return 'gray';
      case 'uncommon': return 'green';
      case 'rare': return 'blue';
      case 'epic': return 'purple';
      case 'legendary': return 'orange';
      default: return 'gray';
    }
  };

  const hasStats = Object.keys(item.vitalBonus).length > 0 || 
                  Object.keys(item.skillBonus).length > 0 ||
                  item.hpBonus > 0 ||
                  item.mpBonus > 0;

  return (
    <Card 
      h="full" 
      _hover={{ shadow: 'md' }} 
      transition="all 0.2s"
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
      border="1px"
      borderColor="red.100"
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
              <StatLabel fontSize="xs">Duration</StatLabel>
              <StatNumber fontSize="sm">{item.duration}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel fontSize="xs">Range</StatLabel>
              <StatNumber fontSize="sm">{item.range}</StatNumber>
            </Stat>
          </SimpleGrid>

          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold">Effect:</Text>
            <Text fontSize="sm" color="red.700">{item.effect}</Text>
          </Box>

          {hasStats && (
            <>
              <Divider />
              <VStack align="start" w="full" spacing={2}>
                {Object.keys(item.vitalBonus).length > 0 && (
                  <VStack align="start" w="full" spacing={1}>
                    <Text fontSize="sm" fontWeight="semibold">Vital Bonuses:</Text>
                    {Object.entries(item.vitalBonus).map(([stat, value]) => (
                      <Text key={stat} fontSize="sm">
                        {stat}: +{value}
                      </Text>
                    ))}
                  </VStack>
                )}

                {Object.keys(item.skillBonus).length > 0 && (
                  <VStack align="start" w="full" spacing={1}>
                    <Text fontSize="sm" fontWeight="semibold">Skill Bonuses:</Text>
                    {Object.entries(item.skillBonus).map(([skill, value]) => (
                      <Text key={skill} fontSize="sm">
                        {skill}: +{value}
                      </Text>
                    ))}
                  </VStack>
                )}

                {(item.hpBonus > 0 || item.mpBonus > 0) && (
                  <VStack align="start" w="full" spacing={1}>
                    {item.hpBonus > 0 && (
                      <Text fontSize="sm">HP Bonus: +{item.hpBonus}</Text>
                    )}
                    {item.mpBonus > 0 && (
                      <Text fontSize="sm">MP Bonus: +{item.mpBonus}</Text>
                    )}
                  </VStack>
                )}
              </VStack>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};