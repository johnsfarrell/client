import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
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
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Character's Favorite Activity</FormLabel>
            <Input
              placeholder="Hiking"
              onChange={handleActivityChange}
              disabled={buttonLoading}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Providence"
              onChange={handleLocationChange}
              disabled={buttonLoading}
            />
          </FormControl>
        </Container>
        <Button
          colorScheme={"green"}
          type={"submit"}
          w={"min-content"}
          isLoading={buttonLoading}
        >
          Generate Your Story 👻
        </Button>
      </Stack>
    </form>
  );
};
