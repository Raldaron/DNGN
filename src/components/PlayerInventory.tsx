import { useState, useEffect } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ScrollsView } from './CategoryViews/ScrollsView';
import { WeaponsView } from './CategoryViews/WeaponsView';
import { ArmorView } from './CategoryViews/ArmorView';
import { ExplosivesView } from './CategoryViews/ExplosivesView';
import { PotionsView } from './CategoryViews/PotionsView';
import { TrapsView } from './CategoryViews/TrapsView';
// Import other category views
import { PlayerInventory } from '../types';

export const PlayerInventoryView = () => {
  const [inventory, setInventory] = useState<PlayerInventory>({
    armor: [],
    ammunition: [],
    crafting_components: [],
    explosives: [],
    potions: [],
    scrolls: [],
    traps: [],
    weapons: []
  });

  useEffect(() => {
    const loadInventory = async () => {
      try {
        // Load player's inventory from backend
        const response = await fetch('/api/player/inventory');
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error loading inventory:', error);
      }
    };

    loadInventory();
  }, []);

  const categories = [
    'Armor',
    'Ammunition',
    'Crafting Components',
    'Explosives',
    'Potions',
    'Scrolls',
    'Traps',
    'Weapons'
  ];

  return (
    <Box p={4}>
      <Tabs>
        <TabList overflowX="auto" flexWrap="wrap">
          {categories.map((category) => (
            <Tab key={category}>{category}</Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <WeaponsView items={inventory.weapons} />
          </TabPanel>
          <TabPanel>
            <ScrollsView items={inventory.scrolls} />
          </TabPanel>
          {/* Add other category panels */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};