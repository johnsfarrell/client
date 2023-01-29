import {
  Box,
  Container,
  Flex,
  Button,
  Center,
  Link,
  Heading,
  Text,
} from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import "./Story.css";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

export const Story = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [typing, setTyping] = useState(true);
  const [page, setPage] = useState(-1);

  const handlePageClick = () => {
    if (typing && story.story[page]) {
      setTyping(!typing);
    } else if (typing && !story.story[page]) {
      setPage(page + 1);
    } else {
      setTyping(true);
      setPage(page + 1);
      playAudio();
      if (page >= story.story.length) {
        window.location.hash = "#";
      }
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
    if (!disabledAudio) {
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
    }
  };

  const [disabledAudio, setDisabledAudio] = useState(false);
  const toggleAudio = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    const music = document.getElementById("music") as HTMLAudioElement;
    const music2 = document.getElementById("music2") as HTMLAudioElement;
    if (disabledAudio) {
      audio.play();
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
    } else {
      audio.pause();
      music.pause();
      music2.pause();
    }
    setDisabledAudio(!disabledAudio);
  };

  const scenes = [
    "https://prod.spline.design/iqDdsKTYCDNl6rDA/scene.splinecode",
    "https://prod.spline.design/tM7mu0ihNJt4CgyD/scene.splinecode",
  ];

  return !isLoading && story !== null && story ? (
    <Box
      w={"100vw"}
      minH={"100vh"}
      maxH={"100vh"}
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
        scene={scenes[Math.floor(Math.random() * scenes.length)]}
        style={{ position: "absolute" }}
        onClick={handlePageClick}
        className={page >= story.story.length ? "Spline fade-out" : "Spline"}
      />
      <Box display={"absolute"} position={"absolute"} top={"1vh"} left={"1vh"}>
        <Link href={"#"}>
          <Button>Home</Button>
        </Link>
        <Button ml={1} fontSize={"3xl"} onClick={toggleAudio}>
          {disabledAudio ? "🔇" : "🔊"}
        </Button>
      </Box>
      {page >= story.story.length ? (
        <Heading
          className="font-effect-fire-animation"
          textAlign={"center"}
          mb="50vh"
          fontFamily={"Sofia"}
        >
          The End
        </Heading>
      ) : (
        <Heading
          color={"#696969"}
          textAlign={"center"}
          mb="50vh"
          fontFamily={"Bakbak One"}
        >
          Loading...
        </Heading>
      )}
      <Container
        bgColor={"#252525"}
        border={"4px solid #424242"}
        maxW={"container.md"}
        p={5}
        rounded={"xl"}
        onClick={handlePageClick}
        _hover={{ cursor: "pointer" }}
        position={"absolute"}
        left={0}
        right={0}
        margin={"auto"}
        display={page >= story.story.length ? "none" : undefined}
        mb={{ sm: 10, base: 20 }}
      >
        <Flex
          justifyContent={story.story[page] ? "space-between" : "center"}
          h={"140"}
        >
          <Box
            fontSize={{ sm: "xl", base: "md" }}
            className={
              typing && story.story[page]
                ? "font-effect-fire-animation"
                : undefined
            }
            color={"#ffffff"}
          >
            {page >= story.story.length ? (
              <></>
            ) : story.story[page] ? (
              typing ? (
                <Typewriter
                  words={[story.story[page]]}
                  loop={1}
                  typeSpeed={18}
                ></Typewriter>
              ) : (
                story.story[page] + " 👉"
              )
            ) : (
              <>
                <Heading
                  as="h2"
                  textAlign={"center"}
                  fontSize={{ sm: "4xl", base: "2xl" }}
                  fontFamily={"Bakbak One"}
                >
                  {story.title}
                </Heading>
                <Text textAlign={"center"} fontSize={"md"} pt={5}>
                  (Tap To Begin 👆)
                </Text>
              </>
            )}
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
