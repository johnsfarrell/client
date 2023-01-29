import {
  Box,
  Container,
  Flex,
  Button,
  Center,
  Link,
  Heading,
} from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import "./Story.css";
import axios from "axios";

export const Story = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(-1);

  const handlePageClick = () => {
    setPage(page + 1);
  };

  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    window.location.hash.split("#story")[1] &&
      axios
        .get(
          `https://hb-server.herokuapp.com/story/getstory/${
            window.location.hash.split("#story/")[1]
          }`
        )
        .then((res) => {
          setStory(res.data.result);
          setIsLoading(false);
          axios.get(
            `https://hb-server.herokuapp.com/story/incrementviews/${
              window.location.hash.split("#story/")[1]
            }`
          );
        });
  }, []);

  return !isLoading && story !== null && story ? (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      alignItems={"flex-end"}
      _hover={{ cursor: "pointer" }}
    >
      <Spline
        scene={"https://prod.spline.design/DV0LmECggYTiJScO/scene.splinecode"}
        style={{ position: "absolute" }}
        onClick={handlePageClick}
      />
      <Box display={"absolute"} position={"absolute"} top={"1vh"} left={"1vh"}>
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
          className={"story"}
        >
          <Box>
            {page >= story.story.length ? (
              <i>The End...</i>
            ) : story.story[page] ? (
              story.story[page] + "..."
            ) : (
              <Heading as="h2" fontSize={"xl"} fontFamily={"Bakbak One"}>
                {story.title}
              </Heading>
            )}
          </Box>
          <Box display={page >= story.story.length ? "none" : "unset"}>
            {">"}
          </Box>
        </Flex>
        {page >= story.story.length && (
          <Center>
            <Link href={"#"}>
              <Button>Home</Button>
            </Link>
          </Center>
        )}
      </Container>
    </Box>
  ) : (
    <></>
  );
};
