import { SimpleGrid, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';
import { ScrollItem } from '../../types';
import { ScrollCard } from '../ItemCards/ScrollCard';

interface ScrollsViewProps {
  items: ScrollItem[];
  onSelect?: (item: ScrollItem) => void;
}

export const ScrollsView: React.FC<ScrollsViewProps> = ({ items, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <VStack spacing={4} w="full">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search scrolls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
  
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} w="full">
          {filteredItems.map((item) => (
            <ScrollCard
              key={item.name}
              item={item}
              onClick={onSelect ? () => onSelect(item) : undefined}
            />
          ))}
        </SimpleGrid>
      </VStack>
    );
  };