import React, { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  HStack,
  Box
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { ArmorItem } from '../../types';
import { ArmorCard } from '../ItemCards/ArmorCard';

interface ArmorViewProps {
  items: ArmorItem[];
}

export const ArmorView = ({ items }: ArmorViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Get unique armor types for filter
  const armorTypes = Array.from(new Set(
    items.map(item => item.armorType)
  )).sort();

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.armorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tankModifier && item.tankModifier.toString().includes(searchTerm)) ||
      (item.armorRating && item.armorRating.toString().includes(searchTerm));

    const matchesType = !typeFilter || 
      item.armorType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <VStack spacing={4} w="full">
      <HStack w="full" spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search armor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Box minW="200px">
          <Select 
            placeholder="Filter by type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {armorTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </Box>
      </HStack>

      {filteredItems.length === 0 ? (
        <Text color="gray.500" textAlign="center">No armor items found</Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {filteredItems.map((item) => (
            <ArmorCard
              key={item.name}
              item={item}
            />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};