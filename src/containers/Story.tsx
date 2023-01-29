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
import { FadeBox } from "../components/MotionBox";

export const Story = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(-1);

  const handlePageClick = () => {
    setPage(page + 1);
    playAudio();
    if (page >= story.story.length) {
      window.location.hash = "#";
    }
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

  const [audioPlaying, setAudioPlaying] = useState(false);
  const playAudio = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    const music = document.getElementById("music") as HTMLAudioElement;
    const music2 = document.getElementById("music2") as HTMLAudioElement;
    if (page < 1) {
      music.play();
    } else {
      music.pause();
      music2.play();
    }
    if (page >= story.story.length - 1) {
      audio.pause();
    } else {
      audio.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  return !isLoading && story !== null && story ? (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      alignItems={"flex-end"}
      _hover={{ cursor: "pointer" }}
      justifyContent={"center"}
      bg={"#000000"}
    >
      <audio id="audio" src={process.env.PUBLIC_URL + "/speaking.mp3"}></audio>
      <audio id="music" src={process.env.PUBLIC_URL + "/song1.mp3"}></audio>
      <audio id="music2" src={process.env.PUBLIC_URL + "/song2.mp3"}></audio>
      <Spline
        scene={"https://prod.spline.design/DV0LmECggYTiJScO/scene.splinecode"}
        style={{ position: "absolute" }}
        onClick={handlePageClick}
        className={page >= story.story.length ? "Spline fade-out" : "Spline"}
      />
      <Box display={"absolute"} position={"absolute"} top={"1vh"} left={"1vh"}>
        <Link href={"#"}>
          <Button>Home</Button>
        </Link>
      </Box>
      {page >= story.story.length && (
        <FadeBox>
          <Heading
            className="font-effect-fire-animation"
            textAlign={"center"}
            mb="50vh"
            fontFamily={"Sofia"}
          >
            The End
          </Heading>
        </FadeBox>
      )}
      <Container
        bgColor={"#ffffff"}
        border={"4px solid #cccccc"}
        borderBottom={"0"}
        maxW={"container.md"}
        p={5}
        roundedTop={"xl"}
        onClick={handlePageClick}
        _hover={{ cursor: "pointer" }}
        position={"absolute"}
        left={0}
        right={0}
        margin={"auto"}
        display={page >= story.story.length ? "none" : undefined}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          pb={"10"}
          className={"story"}
        >
          <Box fontSize={"xl"}>
            {page >= story.story.length ? (
              <></>
            ) : story.story[page] ? (
              <>{story.story[page]}</>
            ) : (
              <Heading as="h2" fontSize={"4xl"} fontFamily={"Bakbak One"}>
                {story.title}...
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
