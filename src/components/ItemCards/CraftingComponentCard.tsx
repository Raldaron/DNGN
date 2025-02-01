'use client';

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
import { CraftingComponentItem } from '../../types';

interface CraftingComponentCardProps {
  item: CraftingComponentItem;
  onClick?: () => void;
}

export const CraftingComponentCard: React.FC<CraftingComponentCardProps> = ({ 
  item, 
  onClick 
}) => {
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

  return (
    <Card 
      h="full" 
      _hover={{ shadow: 'md' }} 
      transition="all 0.2s"
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
      bg="gray.50"
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
            <Text fontSize="sm">{item.effect}</Text>
          </Box>

          <Badge variant="subtle" colorScheme="yellow">
            Crafting Component
          </Badge>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CraftingComponentCard;