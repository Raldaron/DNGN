import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Text,
  Badge,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { ArmorItem } from '../../types';

interface ArmorCardProps {
  item: ArmorItem;
}

export const ArmorCard = ({ item }: ArmorCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      <Card 
        h="full" 
        _hover={{ shadow: 'md' }} 
        transition="all 0.2s"
        onClick={onOpen}
        cursor="pointer"
      >
        <CardBody>
          <VStack align="start" spacing={3}>
            <Flex justify="space-between" w="full" align="center">
              <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
              <Badge colorScheme={getRarityScheme(item.rarity)}>
                {item.rarity}
              </Badge>
            </Flex>
            
            <SimpleGrid columns={2} spacing={2} w="full">
              {item.armorType && item.armorType !== 'N/A' && (
                <Stat size="sm">
                  <StatLabel fontSize="xs">Armor Type</StatLabel>
                  <StatNumber fontSize="sm">{item.armorType}</StatNumber>
                </Stat>
              )}
              
              {item.armorRating && item.armorRating !== 0 && (
                <Stat size="sm">
                  <StatLabel fontSize="xs">Armor Rating</StatLabel>
                  <StatNumber fontSize="sm">{item.armorRating}</StatNumber>
                </Stat>
              )}
            </SimpleGrid>

            {item.tankModifier && item.tankModifier !== 0 && (
              <Text fontSize="sm">
                Tank Modifier: +{item.tankModifier}
              </Text>
            )}
          </VStack>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={2} w="full">
              <Text>{item.name}</Text>
              <Badge colorScheme={getRarityScheme(item.rarity)}>
                {item.rarity}
              </Badge>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={4} w="full">
              <Text color="gray.600">{item.description}</Text>
              
              <Divider />
              
              <SimpleGrid columns={2} spacing={4} w="full">
                {item.armorType && (
                  <Stat>
                    <StatLabel>Armor Type</StatLabel>
                    <StatNumber>{item.armorType}</StatNumber>
                  </Stat>
                )}
                
                {item.armorRating && (
                  <Stat>
                    <StatLabel>Armor Rating</StatLabel>
                    <StatNumber>{item.armorRating}</StatNumber>
                  </Stat>
                )}
              </SimpleGrid>

              {item.tankModifier > 0 && (
                <Text>Tank Modifier: +{item.tankModifier}</Text>
              )}

              {item.skillBonus && Object.keys(item.skillBonus).length > 0 && (
                <VStack align="start" w="full">
                  <Text fontWeight="semibold">Skill Bonuses:</Text>
                  {Object.entries(item.skillBonus).map(([skill, bonus]) => (
                    <Text key={skill}>{skill}: +{bonus}</Text>
                  ))}
                </VStack>
              )}

              {item.vitalBonus && Object.keys(item.vitalBonus).length > 0 && (
                <VStack align="start" w="full">
                  <Text fontWeight="semibold">Vital Bonuses:</Text>
                  {Object.entries(item.vitalBonus).map(([stat, bonus]) => (
                    <Text key={stat}>{stat}: +{bonus}</Text>
                  ))}
                </VStack>
              )}

              {item.abilities && item.abilities.length > 0 && (
                <VStack align="start" w="full">
                  <Text fontWeight="semibold">Abilities:</Text>
                  {item.abilities.map((ability, index) => (
                    <Text key={index}>• {ability}</Text>
                  ))}
                </VStack>
              )}

              {item.spellsGranted && item.spellsGranted.length > 0 && (
                <VStack align="start" w="full">
                  <Text fontWeight="semibold">Spells Granted:</Text>
                  {item.spellsGranted.map((spell, index) => (
                    <Text key={index}>• {spell}</Text>
                  ))}
                </VStack>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};