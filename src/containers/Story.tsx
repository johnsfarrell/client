import { Box, Container, Flex, Button, Center, Link } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import "./Story.css";

const tempStory = {
  title: "The Story of the Three Little Pigs",
  paragraphs: [
    "1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  views: 0,
};

export const Story = () => {
  const [page, setPage] = useState(-1);

  const handlePageClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Box w={"100vw"} h={"100vh"} display={"flex"} alignItems={"flex-end"}>
        <Spline
          scene={"https://prod.spline.design/DV0LmECggYTiJScO/scene.splinecode"}
          style={{ position: "absolute" }}
          onClick={handlePageClick}
        />
        <Box
          display={"absolute"}
          position={"absolute"}
          top={"1vh"}
          left={"1vh"}
        >
          <Link href={"#"}>
            <Button>Home</Button>
          </Link>
        </Box>
        <Container
          bgColor={"#ffffff"}
          p={5}
          roundedTop={"xl"}
          onClick={handlePageClick}
          _hover={{ cursor: "pointer" }}
          position={"absolute"}
          left={0}
          right={0}
          margin={"auto"}
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            pb={"10"}
          >
            <Box>
              {page >= tempStory.paragraphs.length
                ? "The End..."
                : (tempStory.paragraphs[page] || tempStory.title) + "..."}
            </Box>
            <Box
              display={page >= tempStory.paragraphs.length ? "none" : "unset"}
            >
              {">"}
            </Box>
          </Flex>
          {page >= tempStory.paragraphs.length && (
            <Center>
              <Link href={"#"}>
                <Button>Home</Button>
              </Link>
            </Center>
          )}
        </Container>
      </Box>
    </>
  );
};
