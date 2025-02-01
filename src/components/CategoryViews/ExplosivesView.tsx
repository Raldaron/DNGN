import React, { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Box,
  Select,
  HStack
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { ExplosiveItem } from '../../types';
import { ExplosiveCard } from '../ItemCards/ExplosiveCard';

interface ExplosivesViewProps {
  items: ExplosiveItem[];
  onSelect?: (item: ExplosiveItem) => void;
}

export const ExplosivesView = ({ items, onSelect }: ExplosivesViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [damageTypeFilter, setDamageTypeFilter] = useState('');

  // Extract unique damage types from all items
  const uniqueDamageTypes = Array.from(new Set(
    items.flatMap(item => item.damageType.split('/').map(t => t.trim()))
  )).sort();

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.effect.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDamageType = !damageTypeFilter || 
      item.damageType.toLowerCase().includes(damageTypeFilter.toLowerCase());

    return matchesSearch && matchesDamageType;
  });

  return (
    <VStack spacing={4} w="full">
      <HStack w="full" spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search explosives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Box minW="200px">
          <Select 
            placeholder="Filter by damage type"
            value={damageTypeFilter}
            onChange={(e) => setDamageTypeFilter(e.target.value)}
          >
            {uniqueDamageTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </Box>
      </HStack>

      {filteredItems.length === 0 ? (
        <Text color="gray.500" textAlign="center">No explosives found</Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {filteredItems.map((item) => (
            <ExplosiveCard
              key={item.name}
              item={item}
              onClick={() => onSelect?.(item)}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};