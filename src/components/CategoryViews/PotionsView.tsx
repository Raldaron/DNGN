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
import { PotionItem } from '../../types';
import { PotionCard } from '../ItemCards/PotionCard';

interface PotionsViewProps {
  items: PotionItem[];
  onSelect?: (item: PotionItem) => void;
}

export const PotionsView = ({ items, onSelect }: PotionsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');

  // Extract unique rarities from items
  const uniqueRarities = Array.from(new Set(
    items.map(item => item.rarity)
  )).sort();

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.effect.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRarity = !rarityFilter || 
      item.rarity.toLowerCase() === rarityFilter.toLowerCase();

    return matchesSearch && matchesRarity;
  });

  return (
    <VStack spacing={4} w="full">
      <HStack w="full" spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search potions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Box minW="150px">
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
      </HStack>

      {filteredItems.length === 0 ? (
        <Text color="gray.500" textAlign="center">No potions found</Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {filteredItems.map((item) => (
            <PotionCard
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