import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export const Form = () => {
  const toast = useToast();

  const [name, setName] = useState("");
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    toast({
      title: "Story now generating!",
      description: "This may take a minute...",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    axios
      .post("https://hb-server.herokuapp.com/story/test", {
        name: name,
        activity: activity,
        location: location,
      })
      .then((res: any) => {
        let story = res.data.result;
        const splitUp = story.split("\n");
        let title = "";
        for (let i = 0; i < splitUp.length; i++) {
          if (splitUp[i].indexOf("Title:") > -1) {
            let noSpaces = splitUp[i].split(" ");
            noSpaces = noSpaces.splice(1, noSpaces.length);
            title = "";
            for (let k = 0; k < noSpaces.length; k++) {
              title += noSpaces[k] + " ";
            }
            break;
          }
        }
        if (!title) title = splitUp[2];
        if (!title || title.length < 1) title = "A Spooky Story";
        if (title === splitUp[0]) {
          story = story
            .substring(story.indexOf("Title"))
            .split("\n\n")
            .splice(2);
        } else {
          story = story
            .substring(story.indexOf("Title"))
            .split("\n\n")
            .splice(1);
        }
        axios
          .post("https://hb-server.herokuapp.com/story/poststory", {
            title: title,
            story: story,
            views: 0,
          })
          .then((res) => {
            window.location.href = "#story/" + res.data.result;
          });
        setButtonLoading(false);
      })
      .catch((err: any) => {
        toast({
          title: "Failed to submit.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setButtonLoading(false);
      });
  };

  const handleRandomize = () => {
    setName(famousNames[Math.floor(Math.random() * famousNames.length)]);
    setActivity(activities[Math.floor(Math.random() * activities.length)]);
    setLocation(famousPlaces[Math.floor(Math.random() * famousPlaces.length)]);
  };

  // Famous names
  var famousNames = [
    "Michael Jordan",
    "Albert Einstein",
    "Steve Jobs",
    "Mahatma Gandhi",
    "Princess Diana",
    "Mark Zuckerberg",
    "Elon Musk",
    "Beyoncé",
    "Nelson Mandela",
    "Bill Gates",
  ];

  // Famous places
  var famousPlaces = [
    "Eiffel Tower",
    "Great Wall of China",
    "Sistine Chapel",
    "Taj Mahal",
    "Grand Canyon",
    "Sydney Opera House",
    "Statue of Liberty",
    "Mount Everest",
    "Niagara Falls",
    "Machu Picchu",
  ];

  // Different activities
  var activities = [
    "hiking",
    "skiing",
    "swimming",
    "reading",
    "cooking",
    "biking",
    "dancing",
    "yoga",
    "surfing",
    "rock climbing",
  ];

  const [word, setWord] = useState("");
  async function logWithDelay(words: any) {
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i * 1000));
      setWord(words[i]);
    }
  }

  useEffect(() => {
    logWithDelay([
      "This ghost story is sure to raise your spirits.",
      "Get ready to be haunted by this tale of terror.",
      "This story is so spooky, it's sure to give you goosebumps.",
      "Brace yourself for a spine-tingling story that will leave you ghostly.",
      "This story is sure to be a haunting experience.",
      "Are you ready to be scared out of your wits by this ghostly tale?",
      "This story is so eerie, it's sure to send shivers down your spine.",
      "Get ready to be spooked by this ghostly tale of terror.",
      "This story is sure to be a creepy, crawly experience.",
      "Are you ready to be haunted by the spine-chilling story that is about to unfold?",
    ]);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack alignItems={"center"} spacing={"4"}>
        <Heading as={"h1"} textAlign={"center"} mb={4} fontFamily="Bakbak One">
          Ghost Story Generator 👻
        </Heading>
        <Container>
          <FormControl isRequired>
            <FormLabel>Character Name</FormLabel>
            <Input
              placeholder="John Hickey"
              onChange={handleNameChange}
              disabled={buttonLoading}
              defaultValue={name}
            />
          </FormControl>
          <FormControl isRequired pt={5}>
            <FormLabel>Character's Favorite Activity</FormLabel>
            <Input
              placeholder="Hiking"
              onChange={handleActivityChange}
              disabled={buttonLoading}
              defaultValue={activity}
            />
          </FormControl>
          <FormControl isRequired pt={5}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Providence"
              onChange={handleLocationChange}
              disabled={buttonLoading}
              defaultValue={location}
            />
          </FormControl>
        </Container>
        <Flex>
          <Button
            colorScheme={"green"}
            type={"submit"}
            w={"min-content"}
            isLoading={buttonLoading}
            mr={1}
          >
            Generate Your Story 👻
          </Button>
          <Button
            colorScheme={"orange"}
            onClick={handleRandomize}
            w={"min-content"}
            isDisabled={buttonLoading}
          >
            🎲
          </Button>
        </Flex>
        {buttonLoading && (
          <Text color={"#666666"}>
            <i>{word}</i>
          </Text>
        )}
      </Stack>
    </form>
  );
};
