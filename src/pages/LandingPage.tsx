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
      minH={"100vh"}
      bgImage={process.env.PUBLIC_URL + "/pattern.svg"}
      overflowY={"hidden"}
    >
      <Box
        bgGradient={
          "linear-gradient(to right, rgba(214,156,47,0.95) 0%, rgba(214,156,47,0.97) 10%, rgba(214,156,47,.99) 30%, rgba(214,156,47,.99) 70%, rgba(214,156,47,0.97) 90%, rgba(214,156,47,0.95) 100%);"
        }
        h={"100vh"}
      >
        <Container maxW={"container.md"}>
          <BounceBox>
            <img
              alt={"campfire"}
              width={"100px"}
              src={
                "https://i.pinimg.com/originals/b9/67/d1/b967d1e281bd0aaca615e889386b0496.gif"
              }
              style={{
                position: "relative",
                top: "8px",
                right: "18px",
                margin: "0",
              }}
            />
            <Tabs isFitted variant="soft-rounded" shadow={"xl"}>
              <TabList
                bgColor={"#ffffff"}
                roundedTop={"lg"}
                px={{ md: 5, base: 1 }}
                pt={5}
              >
                <Tab>Generate Story</Tab>
                <Tab>Popular Stories</Tab>
                <Tab>About Project</Tab>
              </TabList>

              <TabPanels>
                <TabPanel
                  bgColor={"#ffffff"}
                  roundedBottom={"lg"}
                  p={{ sm: 10, base: 4 }}
                >
                  <Form />
                </TabPanel>
                <TabPanel
                  bgColor={"#ffffff"}
                  roundedBottom={"lg"}
                  p={{ sm: 10, base: 4 }}
                >
                  <Stories />
                </TabPanel>
                <TabPanel
                  bgColor={"#ffffff"}
                  roundedBottom={"lg"}
                  p={{ sm: 10, base: 4 }}
                >
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
