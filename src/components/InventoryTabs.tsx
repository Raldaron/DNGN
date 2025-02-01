import React, { useState, useEffect } from 'react';
import {
  Box, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Input,
  VStack, Card, CardBody, Text, Badge, InputGroup, InputLeftElement,
  Spinner, Center, Divider, Stack, Flex, Stat, StatLabel, StatNumber,
  StatHelpText
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

// Interfaces
interface ScrollItem {
  name: string;
  description: string;
  effect: string;
  range: string;
  damage: string;
  damageType: string;
  castingTime: string;
  abilityPointCost: string;
  cooldown: string;
  scaling: string;
  spellCastingModifier: string;
}

interface WeaponItem {
  name: string;
  description: string;
  itemType: string;
  weaponType: string;
  rarity: string;
  meleeRanged: string;
  magicNonMagical: string;
  handsRequired: string;
  damageType: string;
  damageAmount: string;
  statBonus?: {
    [key: string]: number;
  };
  skillBonus?: {
    [key: string]: number;
  };
  abilities: string[];
  traits: string[];
  spellsGranted: {
    [key: string]: string;
  };
  hpBonus: number;
  mpBonus: number;
}

interface ArmorItem {
  name: string;
  description: string;
  rarity: string;
}

type Item = ScrollItem | WeaponItem | ArmorItem;

interface Items {
  armor?: { [key: string]: ArmorItem };
  ammunition?: { [key: string]: Item };
  crafting_components?: { [key: string]: Item };
  explosives?: { [key: string]: Item };
  potions?: { [key: string]: Item };
  scrolls?: { [key: string]: ScrollItem };
  traps?: { [key: string]: Item };
  weapons?: { [key: string]: WeaponItem };
  [key: string]: { [key: string]: Item } | undefined;
}

// Type guards
const isScrollItem = (item: Item): item is ScrollItem => {
  return 'effect' in item && 'castingTime' in item && 'spellCastingModifier' in item;
};

const isWeaponItem = (item: Item): item is WeaponItem => {
  return 'weaponType' in item && 'meleeRanged' in item;
};

// Specialized card components
const WeaponCard = ({ item }: { item: WeaponItem }) => {
  return (
    <Card h="full" _hover={{ shadow: 'md' }} transition="all 0.2s">
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
          
          <SimpleGrid columns={2} spacing={2} w="full">
            <Stat size="sm">
              <StatLabel fontSize="xs">Weapon Type</StatLabel>
              <StatNumber fontSize="sm">{item.weaponType}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel fontSize="xs">Damage</StatLabel>
              <StatNumber fontSize="sm">{item.damageAmount}</StatNumber>
              <StatHelpText fontSize="xs">{item.damageType}</StatHelpText>
            </Stat>
          </SimpleGrid>

          <Stack direction="row" wrap="wrap" spacing={2}>
            <Badge variant="outline">{item.meleeRanged}</Badge>
            <Badge variant="outline">{item.magicNonMagical}</Badge>
            <Badge variant="outline">{item.handsRequired}</Badge>
          </Stack>

          {(item.statBonus && Object.keys(item.statBonus).length > 0) && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Stat Bonuses:</Text>
              {Object.entries(item.statBonus).map(([stat, bonus]) => (
                <Text key={stat} fontSize="sm">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{bonus}
                </Text>
              ))}
            </VStack>
          )}

          {(item.skillBonus && Object.keys(item.skillBonus).length > 0) && (
            <VStack align="start" w="full" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold">Skill Bonuses:</Text>
              {Object.entries(item.skillBonus).map(([skill, bonus]) => (
                <Text key={skill} fontSize="sm">
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}: +{bonus}
                </Text>
              ))}
            </VStack>
          )}

          {item.hpBonus > 0 && (
            <Text fontSize="sm">HP Bonus: +{item.hpBonus}</Text>
          )}
          
          {item.mpBonus > 0 && (
            <Text fontSize="sm">MP Bonus: +{item.mpBonus}</Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

const ScrollCard = ({ item }: { item: ScrollItem }) => {
  return (
    <Card h="full" _hover={{ shadow: 'md' }} transition="all 0.2s">
      <CardBody>
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
          <Text fontSize="sm" color="gray.600">{item.description}</Text>
          <Divider />
          <VStack align="start" spacing={2}>
            <Text fontSize="sm"><strong>Effect:</strong> {item.effect}</Text>
            <Text fontSize="sm"><strong>Range:</strong> {item.range}</Text>
            {item.damage !== 'N/A' && (
              <Text fontSize="sm"><strong>Damage:</strong> {item.damage} ({item.damageType})</Text>
            )}
            <Text fontSize="sm"><strong>Casting Time:</strong> {item.castingTime}</Text>
            <Text fontSize="sm"><strong>Cost:</strong> {item.abilityPointCost}</Text>
            <Text fontSize="sm"><strong>Cooldown:</strong> {item.cooldown}</Text>
            <Text fontSize="sm"><strong>Modifier:</strong> {item.spellCastingModifier}</Text>
            <Divider />
            <Text fontSize="sm"><strong>Scaling:</strong></Text>
            <Text fontSize="xs" dangerouslySetInnerHTML={{ __html: item.scaling }} />
          </VStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

// Default card for other item types
const DefaultCard = ({ item }: { item: Item }) => {
  return (
    <Card h="full" _hover={{ shadow: 'md' }} transition="all 0.2s">
      <CardBody>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">{item.name}</Text>
          {'rarity' in item && (
            <Badge colorScheme={getRarityScheme(item.rarity)}>
              {item.rarity}
            </Badge>
          )}
          <Text fontSize="sm" color="gray.600" noOfLines={3}>
            {item.description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

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

// ItemCard component that determines which specialized card to use
const ItemCard = ({ item, type }: { item: Item; type: string }) => {
  if (type === 'scrolls' && isScrollItem(item)) {
    return <ScrollCard item={item} />;
  }
  
  if (type === 'weapons' && isWeaponItem(item)) {
    return <WeaponCard item={item} />;
  }

  return <DefaultCard item={item} />;
};

// Main inventory component
const InventoryTabs = () => {
  const [items, setItems] = useState<Items>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadItems = async () => {
      try {
        const fileNames = [
          'armor.json',
          'ammunition.json',
          'crafting_components.json',
          'explosives.json',
          'potions.json',
          'scrolls.json',
          'traps.json',
          'weapons.json'
        ];

        const responses = await Promise.all(
          fileNames.map(filename => 
            fetch('/' + filename)
              .then(res => res.json())
              .catch(() => null)
          )
        );

        const newItems: Items = {};
        responses.forEach((data, index) => {
          if (data) {
            const key = fileNames[index].replace('.json', '');
            newItems[key] = data[key] || data[key.replace('_', '')];
          }
        });

        setItems(newItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading items:', error);
        setError('Error loading items');
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const filterItems = (category: string): [Item, string][] => {
    if (category === 'All') {
      return Object.entries(items).flatMap(([categoryName, categoryItems]) => 
        Object.values(categoryItems || {})
          .filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(item => [item, categoryName] as [Item, string])
      );
    }

    const categoryKey = category.toLowerCase().replace(' ', '_');
    const categoryItems = items[categoryKey] || {};
    return Object.values(categoryItems)
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(item => [item, categoryKey] as [Item, string]);
  };

  const categories = [
    'All',
    'Armor',
    'Ammunition',
    'Crafting Components',
    'Explosives',
    'Potions',
    'Scrolls',
    'Traps',
    'Weapons'
  ];

  if (isLoading) {
    return (
      <Center h="400px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="400px">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Tabs onChange={(index) => setActiveTab(categories[index])}>
        <Box mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
        
        <TabList overflowX="auto" flexWrap="wrap">
          {categories.map((category) => (
            <Tab key={category}>{category}</Tab>
          ))}
        </TabList>

        <TabPanels mt={4}>
          {categories.map((category) => (
            <TabPanel key={category}>
              <SimpleGrid columns={[1, 1, 2, 3]} spacing={4}>
                {filterItems(category).map(([item, itemType], index) => (
                  <ItemCard 
                    key={`${item.name}-${index}`} 
                    item={item} 
                    type={itemType}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default InventoryTabs;