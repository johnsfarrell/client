import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
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
    axios
      .post("https://hb-server.herokuapp.com/story/test/", {
        name: name,
        activity: activity,
        location: location,
      })
      .then((res: any) => {
        toast({
          title: "Details submitted.",
          description: "Your colleges will appear soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err: any) => {
        toast({
          title: "Failed to submit.",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Stack p={"10"} bgColor={"#fcfcfc"} rounded={"lg"} shadow={"xl"}>
      <form onSubmit={handleSubmit}>
        <Heading as={"h1"}>Ghost Story Generator</Heading>
        <FormControl isRequired>
          <FormLabel>Character Name</FormLabel>
          <Input placeholder="John Hickey" onChange={handleNameChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Character's Favorite Activity</FormLabel>
          <Input placeholder="Hiking" onChange={handleActivityChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input placeholder="Providence" onChange={handleLocationChange} />
        </FormControl>
        <Button
          colorScheme={"green"}
          type={"submit"}
          w={"min-content"}
          isLoading={buttonLoading}
        >
          Generate Your Story
        </Button>
      </form>
    </Stack>
  );
};
