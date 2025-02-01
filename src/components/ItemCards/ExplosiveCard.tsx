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
import { ExplosiveItem } from '../../types';

interface ExplosiveCardProps {
  item: ExplosiveItem;
  onClick?: () => void;
}

export const ExplosiveCard = ({ item, onClick }: ExplosiveCardProps) => {
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

  // Split damage types and values if they contain multiple
  const damageInfo = {
    values: item.damage.split('/').map(d => d.trim()),
    types: item.damageType.split('/').map(t => t.trim())
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
              <StatLabel fontSize="xs">Blast Radius</StatLabel>
              <StatNumber fontSize="sm">{item.blastRadius} ft</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel fontSize="xs">Duration</StatLabel>
              <StatNumber fontSize="sm">{item.duration}</StatNumber>
            </Stat>
          </SimpleGrid>

          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold" mb={2}>Damage:</Text>
            <SimpleGrid columns={damageInfo.values.length} spacing={2}>
              {damageInfo.values.map((damage, index) => (
                <Box key={index} p={2} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" fontWeight="medium">
                    {damage}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {damageInfo.types[index]}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <VStack align="start" w="full" spacing={1}>
            <Text fontSize="sm" fontWeight="semibold">Effect:</Text>
            <Text fontSize="sm">{item.effect}</Text>
          </VStack>

          <VStack align="start" w="full" spacing={1}>
            <Text fontSize="sm" fontWeight="semibold">Trigger Mechanism:</Text>
            <Text fontSize="sm">{item.triggerMechanism}</Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};