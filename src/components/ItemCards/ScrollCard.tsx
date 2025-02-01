import { Card, CardBody, Stack, Text, VStack, Divider } from '@chakra-ui/react';
import { ScrollItem } from '../../types';

interface ScrollCardProps {
  item: ScrollItem;
  onClick?: () => void;  // Make onClick optional
}

export const ScrollCard: React.FC<ScrollCardProps> = ({ item, onClick }) => {
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