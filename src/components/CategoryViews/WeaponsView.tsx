import React, { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { WeaponItem } from '../../types';
import { WeaponCard } from '../ItemCards/WeaponCard';

interface WeaponsViewProps {
  items: WeaponItem[];
  onSelect?: (item: WeaponItem) => void;
}

export const WeaponsView = ({ items, onSelect }: WeaponsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');
  const [weaponTypeFilter, setWeaponTypeFilter] = useState('');
  const [damageTypeFilter, setDamageTypeFilter] = useState('');
  const [combatTypeFilter, setCombatTypeFilter] = useState('');

  // Extract unique values for filters
  const uniqueRarities = Array.from(new Set(items.map(item => item.rarity))).sort();
  const uniqueWeaponTypes = Array.from(new Set(items.map(item => item.weaponType))).sort();
  const uniqueDamageTypes = Array.from(new Set(items.map(item => item.damageType))).sort();
  const combatTypes = ['All', 'Melee', 'Ranged'];

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRarity = !rarityFilter || 
      item.rarity === rarityFilter;

    const matchesWeaponType = !weaponTypeFilter || 
      item.weaponType === weaponTypeFilter;

    const matchesDamageType = !damageTypeFilter || 
      item.damageType === damageTypeFilter;

    const matchesCombatType = !combatTypeFilter || combatTypeFilter === 'All' || 
      item.meleeRanged === combatTypeFilter;

    return matchesSearch && matchesRarity && matchesWeaponType && 
           matchesDamageType && matchesCombatType;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    // Sort by weaponType first, then by name
    if (a.weaponType !== b.weaponType) return a.weaponType.localeCompare(b.weaponType);
    return a.name.localeCompare(b.name);
  });

  return (
    <VStack spacing={4} w="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search weapons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
        <GridItem>
          <Select 
            placeholder="All Rarities"
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
          >
            {uniqueRarities.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select 
            placeholder="All Weapon Types"
            value={weaponTypeFilter}
            onChange={(e) => setWeaponTypeFilter(e.target.value)}
          >
            {uniqueWeaponTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select 
            placeholder="All Damage Types"
            value={damageTypeFilter}
            onChange={(e) => setDamageTypeFilter(e.target.value)}
          >
            {uniqueDamageTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Select 
            placeholder="Combat Type"
            value={combatTypeFilter}
            onChange={(e) => setCombatTypeFilter(e.target.value)}
          >
            {combatTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </GridItem>
      </Grid>

      {filteredItems.length === 0 ? (
        <Text color="gray.500" textAlign="center">No weapons found</Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {sortedItems.map((item) => (
            <WeaponCard
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