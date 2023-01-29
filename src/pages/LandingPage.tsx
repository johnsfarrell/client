import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BounceBox } from "../components/MotionBox";
import { About } from "../containers/About";
import { Form } from "../containers/Form";
import { Stories } from "../containers/Stories";

export const LandingPage = () => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      bg={"#38285c"}
      bgImage={process.env.PUBLIC_URL + "/pattern.svg"}
    >
      <Box
        bgGradient={
          "linear-gradient(to right, rgba(225,225,225,0.95) 0%, rgba(225,225,225,0.97) 10%, rgba(225,225,225,.99) 30%, rgba(225,225,225,.99) 70%, rgba(225,225,225,0.97) 90%, rgba(225,225,225,0.95) 100%);"
        }
        h={"100vh"}
      >
        <Container pt={"69"} maxW={"container.md"}>
          <BounceBox>
            <Tabs isFitted variant="soft-rounded" shadow={"xl"}>
              <TabList bgColor={"#ffffff"} roundedTop={"lg"} px={5} pt={5}>
                <Tab>Generate Story</Tab>
                <Tab>Popular Stories</Tab>
                <Tab>About Project</Tab>
              </TabList>

              <TabPanels>
                <TabPanel bgColor={"#ffffff"} roundedBottom={"lg"} p={10}>
                  <Form />
                </TabPanel>
                <TabPanel bgColor={"#ffffff"} roundedBottom={"lg"} p={10}>
                  <Stories />
                </TabPanel>
                <TabPanel bgColor={"#ffffff"} roundedBottom={"lg"} p={10}>
                  <About />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </BounceBox>
        </Container>
      </Box>
    </Box>
  );
};
