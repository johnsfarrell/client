import {
  Avatar,
  Heading,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

interface CreatorIconProps {
  name: string;
  src: string;
  link: string;
}
const CreatorIcon = ({ name, src, link }: CreatorIconProps) => {
  return (
    <WrapItem>
      <Link href={link}>
        <Avatar name={name} src={src} />
      </Link>
    </WrapItem>
  );
};

export const About = () => {
  return (
    <Stack>
      <Heading as="h1" fontFamily="Bakbak One">
        About this Project
      </Heading>
      <Heading fontFamily="Actor" size="xs" as="h2" color={"#666666"} pt={4}>
        Description
      </Heading>
      <Text fontSize={"sm"}>
        "Ghost Story Generator" is a project for Hack@Brown 2023 that utilizes
        the MERN stack (MongoDB, Express.js, React, and Node.js) to generate
        spooky stories based on user input. Users can input details such as a
        character, location, and an activity, and the application will use
        OpenAI's API to generate a unique ghost story incorporating those
        elements. The project also utilizes Chakra UI for a sleek and modern
        user interface, as well as Spline for 3D renders. With this project,
        users will be able to easily create their own ghost stories and share
        them with friends, adding an extra layer of fun to storytelling.
      </Text>
      <Heading fontFamily="Actor" size="xs" as="h2" color={"#666666"} pt={4}>
        Creators (Ctrl+Alt+Defeat)
      </Heading>
      <Wrap>
        <CreatorIcon
          name={"Justin Hickey"}
          src={
            "https://media.licdn.com/dms/image/C5603AQHgvBDRjgYI3w/profile-displayphoto-shrink_400_400/0/1632606136612?e=1680134400&v=beta&t=1pNiWvDToWQVq6IHrLLT2wE-6bvK-x37RnwttiNV9rM"
          }
          link={"https://www.linkedin.com/in/justin-hickey-9618aa217/"}
        />
        <CreatorIcon
          name={"John Farrell"}
          src={
            "https://media.licdn.com/dms/image/D4E03AQFkYwurI7k4xw/profile-displayphoto-shrink_400_400/0/1666456660962?e=1680134400&v=beta&t=QPqqjJmByUVDJcQZZVUkTW6YyA1VJmhjNxDMzwdrZj4"
          }
          link={"https://www.linkedin.com/in/johnsfarrell/"}
        />
      </Wrap>
    </Stack>
  );
};
