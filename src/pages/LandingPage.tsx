import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { About } from "../containers/About";
import { Form } from "../containers/Form";
import { Stories } from "../containers/Stories";

export const LandingPage = () => {
  return (
    <Box w={"100vw"} h={"100vh"}>
      <Container pt={"69"}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Generate Story</Tab>
            <Tab>Popular Stories</Tab>
            <Tab>About Project</Tab>
          </TabList>

          <TabPanels>
            <TabPanel border={"1px solid #f0f0f0"} roundedBottom={"lg"}>
              <Form />
            </TabPanel>
            <TabPanel border={"1px solid #f0f0f0"} roundedBottom={"lg"}>
              <Stories />
            </TabPanel>
            <TabPanel border={"1px solid #f0f0f0"} roundedBottom={"lg"}>
              <About />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};
