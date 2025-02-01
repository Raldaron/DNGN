
import React, { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
  Select,
  Box
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { TrapItem } from '../../types';
import { TrapCard } from '../ItemCards/TrapCard';

interface TrapsViewProps {
  items: TrapItem[];
  onSelect?: (item: TrapItem) => void;
}

export const TrapsView = ({ items, onSelect }: TrapsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');

  // Extract unique values for filters
  const uniqueRarities = Array.from(new Set(
    items.map(item => item.rarity)
  )).sort();

  const uniqueDurations = Array.from(new Set(
    items.map(item => item.duration)
  )).sort();

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.effect.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRarity = !rarityFilter || 
      item.rarity.toLowerCase() === rarityFilter.toLowerCase();

    const matchesDuration = !durationFilter || 
      item.duration === durationFilter;

    return matchesSearch && matchesRarity && matchesDuration;
  });

  return (
    <VStack spacing={4} w="full">
      <VStack w="full" spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search traps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <HStack w="full" spacing={4}>
          <Box flex={1}>
            <Select 
              placeholder="Filter by rarity"
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
            >
              {uniqueRarities.map((rarity) => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </Select>
          </Box>
          <Box flex={1}>
            <Select 
              placeholder="Filter by duration"
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              {uniqueDurations.map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </Select>
          </Box>
        </HStack>
      </VStack>

      {filteredItems.length === 0 ? (
        <Text color="gray.500" textAlign="center">No traps found</Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {filteredItems.map((item) => (
            <TrapCard
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