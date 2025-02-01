'use client'

import PlayerNameField from '@/components/PlayerNameField'
import CharacterNameField from '@/components/CharacterNameField'
import CharacterLevel from '@/components/CharacterLevel'
import CharacterRace from '@/components/CharacterRace'
import CharacterClass from '@/components/CharacterClass'
import {
  HPField,
  MPField,
  APField,
  StylePointsField,
  SkillPointsField,
  AttributePointsField
} from '@/components/PointFields'
import {
  SimpleGrid,
  Box,
  Card,
  CardBody,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack
} from '@chakra-ui/react'
import { StatsContainer } from '@/components/StatsContainer'
import { SkillGrid } from '@/components/SkillGrid'
import { TraitsGrid } from '@/components/TraitsGrid'
import InventoryTabs from '@/components/InventoryTabs'

export default function Home() {
  return (
    <main>
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <Box p={6}>
          <SimpleGrid columns={6} spacing={6}>
            {/* First Row - Player Name | Character Name */}
            <GridItem colSpan={3}>
              <Card>
                <CardBody>
                  <PlayerNameField
                    initialName=""
                    onChange={(name) => console.log('Player name:', name)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={3}>
              <Card>
                <CardBody>
                  <CharacterNameField
                    initialName=""
                    onChange={(name) => console.log('Character name:', name)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            {/* Second Row - Race | Class | Level */}
            <GridItem colSpan={2}>
              <Card>
                <CardBody>
                  <CharacterRace
                    onChange={(race) => console.log('Selected race:', race)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={2}>
              <Card>
                <CardBody>
                  <CharacterClass
                    onChange={(className) => console.log('Selected class:', className)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={2}>
              <Card>
                <CardBody>
                  <CharacterLevel
                    initialLevel={1}
                    onChange={(level) => console.log('Character level:', level)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            {/* Third Row - HP | MP | AP | Style | Attribute P | Skill Points */}
            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <HPField
                    onChange={(value) => console.log('HP:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <MPField
                    onChange={(value) => console.log('MP:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <APField
                    onChange={(value) => console.log('AP:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <StylePointsField
                    onChange={(value) => console.log('Style Points:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <AttributePointsField
                    onChange={(value) => console.log('Attribute Points:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem colSpan={1}>
              <Card>
                <CardBody>
                  <SkillPointsField
                    onChange={(value) => console.log('Skill Points:', value)}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </SimpleGrid>
        </Box>

        {/* Tabbed Section */}
        <Box p={6}>
          <Card>
            <CardBody>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab>Character</Tab>
                  <Tab>Actions</Tab>
                  <Tab>Equipment</Tab>
                  <Tab>Inventory</Tab>
                  <Tab>Arcana</Tab>
                  <Tab>Loot</Tab>
                  <Tab>Notes</Tab>
                  <Tab>Quests</Tab>
                </TabList>
                <TabPanels>
                  {/* Character Tab */}
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        <Tab>Stats</Tab>
                        <Tab>Skills</Tab>
                        <Tab>Traits</Tab>
                      </TabList>
                      <TabPanels>
                        {/* Inside the Stats TabPanel */}
                        <TabPanel>
                          <Box p={4}>
                            <StatsContainer />
                          </Box>
                        </TabPanel>
                        {/* Inside the Skills TabPanel */}
                        <TabPanel>
                          <Box p={4}>
                            <SkillGrid />
                          </Box>
                        </TabPanel>
                        {/* Inside the Traits TabPanel */}
                        <TabPanel>
                          <Box p={4}>
                            <TraitsGrid />
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  {/* Actions Tab */}
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        <Tab>Attacks</Tab>
                        <Tab>Abilities</Tab>
                        <Tab>Spells</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box>Attacks Content</Box>
                        </TabPanel>
                        <TabPanel>
                          <Box>Abilities Content</Box>
                        </TabPanel>
                        <TabPanel>
                          <Box>Spells Content</Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  {/* Equipment Tab */}
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        <Tab>Weapons</Tab>
                        <Tab>Armor</Tab>
                        <Tab>Utility</Tab>
                        <Tab>Tattoos</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box>Weapons Content</Box>
                        </TabPanel>
                        <TabPanel>
                          <Box>Armor Content</Box>
                        </TabPanel>
                        <TabPanel>
                          <Box>Utility Content</Box>
                        </TabPanel>
                        <TabPanel>
                          <Box>Tattoos Content</Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>

                  {/* Inventory Tab */}
                  <TabPanel>
                    <Box p={4}>
                      <InventoryTabs />
                    </Box>
                  </TabPanel>

                  {/* Regular tabs without subtabs */}
                  <TabPanel>
                    <Box>Arcana Content</Box>
                  </TabPanel>
                  <TabPanel>
                    <Box>Loot Content</Box>
                  </TabPanel>
                  <TabPanel>
                    <Box>Notes Content</Box>
                  </TabPanel>
                  <TabPanel>
                    <Box>Quests Content</Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Box>
      </VStack>
    </main>
  )
}