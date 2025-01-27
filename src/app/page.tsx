'use client'

import PlayerNameField from '@/components/PlayerNameField'
import CharacterNameField from '@/components/CharacterNameField'
import CharacterLevel from '@/components/CharacterLevel'
import CharacterRace from '@/components/CharacterRace'
import CharacterClass from '@/components/CharacterClass'
import { SimpleGrid, Box, Card, CardBody } from '@chakra-ui/react'

export default function Home() {
  return (
    <main>
      <Box p={6}>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Card>
            <CardBody>
              <PlayerNameField 
                initialName=""
                onChange={(name) => console.log('Player name:', name)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CharacterNameField 
                initialName=""
                onChange={(name) => console.log('Character name:', name)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CharacterLevel
                initialLevel={1}
                onChange={(level) => console.log('Character level:', level)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CharacterRace
                onChange={(race) => console.log('Selected race:', race)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CharacterClass
                onChange={(className) => console.log('Selected class:', className)}
              />
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </main>
  )
}