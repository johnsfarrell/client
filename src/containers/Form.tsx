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
    let str = activities[Math.floor(Math.random() * activities.length)];
    setActivity(str.charAt(0).toUpperCase() + str.slice(1));
    setLocation(famousPlaces[Math.floor(Math.random() * famousPlaces.length)]);
  };
  const handleBrownRandomize = () => {
    setName(
      famousPeopleAtBrown[
        Math.floor(Math.random() * famousPeopleAtBrown.length)
      ]
    );
    let str =
      brownActivities[Math.floor(Math.random() * brownActivities.length)];
    setActivity(str.charAt(0).toUpperCase() + str.slice(1));
    setLocation(brownPlaces[Math.floor(Math.random() * brownPlaces.length)]);
  };

  // Famous names
  var famousNames = [
    "Elon Musk",
    "Steve Jobs",
    "Mark Zuckerberg",
    "Bill Gates",
    "Barack Obama",
    "Mahatma Gandhi",
    "Nelson Mandela",
    "Albert Einstein",
    "Isaac Newton",
    "Stephen Hawking",
    "Neil Armstrong",
    "Leonardo da Vinci",
    "Michael Jackson",
    "Princess Diana",
    "John Lennon",
    "Elvis Presley",
    "Bob Marley",
    "Michael Jordan",
    "Peyton Manning",
    "LeBron James",
    "Muhammad Ali",
    "Usain Bolt",
    "Neymar Jr.",
    "Cristiano Ronaldo",
    "Lionel Messi",
    "Roger Federer",
    "Serena Williams",
    "Michael Schumacher",
    "Ayrton Senna",
    "Nelson Mandela",
    "Mahalia Jackson",
    "Martin Luther King Jr.",
    "Abraham Lincoln",
    "George Washington",
    "Thomas Jefferson",
    "Winston Churchill",
    "Mahatma Gandhi",
    "Mother Teresa",
    "Princess Diana",
    "John F. Kennedy",
    "Bill Clinton",
    "Barack Obama",
    "Nelson Mandela",
    "Malala Yousafzai",
    "Bill Gates",
    "Mark Zuckerberg",
    "Oprah Winfrey",
    "Beyoncé",
    "Steve Jobs",
    "Elon Musk",
  ];

  // Famous places
  var famousPlaces = [
    "Eiffel Tower",
    "Statue of Liberty",
    "Great Wall of China",
    "Sistine Chapel",
    "Pyramids of Giza",
    "Taj Mahal",
    "Colosseum",
    "Chichen Itza",
    "Machu Picchu",
    "Stonehenge",
    "Angkor Wat",
    "Mount Everest",
    "Niagara Falls",
    "Grand Canyon",
    "Yellowstone National Park",
    "Yosemite National Park",
    "Zion National Park",
    "Sydney Opera House",
    "Big Ben",
    "Saint Basil's Cathedral",
    "Petra",
    "Santorini",
    "Cinque Terre",
    "Plitvice Lakes National Park",
    "Serengeti National Park",
    "Victoria Falls",
    "Banff National Park",
    "Iguazu Falls",
    "Uluru",
    "Tromsø Midnight Sun",
    "Aurora borealis",
    "Halong Bay",
    "The Great Barrier Reef",
    "The Maldives",
    "The Serengeti",
    "The Amazon Rainforest",
    "The Galapagos Islands",
    "The Dead Sea",
    "Mount Kilimanjaro",
    "The Blue Lagoon",
    "The Northern Lights",
    "Mount Fuji",
  ];

  // Different activities
  var activities = [
    "Surfing",
    "Skydiving",
    "Bungee Jumping",
    "Canyoneering",
    "Rock Climbing",
    "Caving",
    "Scuba Diving",
    "Snorkeling",
    "Kayaking",
    "Canoeing",
    "Rafting",
    "Sailing",
    "Kiteboarding",
    "Windsurfing",
    "Paragliding",
    "Hang Gliding",
    "Helicopter Tour",
    "Hot Air Balloon Ride",
    "Zip Lining",
    "Rappelling",
    "Hiking",
    "Trekking",
    "Camping",
    "Fishing",
    "Hunting",
    "Golfing",
    "Skiing",
    "Snowboarding",
    "Snowshoeing",
    "Snowmobiling",
    "Ice Skating",
    "Ice Fishing",
    "Ice Climbing",
    "Cross-Country Skiing",
    "Mountain Biking",
    "BMX",
    "Motocross",
    "ATV",
    "Go-Kart Racing",
    "Horseback Riding",
    "Rock Art Tour",
    "Cultural Tour",
    "Food Tour",
    "Wine Tasting",
    "Brewery Tour",
    "Distillery Tour",
    "Spa Day",
    "Yoga Retreat",
    "Meditation Retreat",
  ];

  var brownPlaces = [
    "The Ratty",
    "The Blue Room",
    "The Keeney Quad",
    "The Sciences Library",
    "The Wriston Quad",
    "The Stephen Robert '62 Campus Center",
    "The Salomon Center for Teaching",
    "The Granoff Center for the Creative Arts",
    "The Pembroke Campus",
    "The Perry and Marty Granoff Center for the Creative Arts",
    "The Brown/RISD Hillel",
    "The John D. Rockefeller Jr. Library",
    "The Brown/RISD Dual Degree Program",
    "The Brown/Trinity Rep Consortium",
    "The Brown/Rhode Island School of Design Consortium",
    "The Brown/Oxford Consortium",
    "The Brown/Ecole Normale Supérieure Consortium",
    "The Brown/Pembroke Center",
    "The Brown/Butler Consortium",
    "The Brown/RISD Dual Degree Program",
  ];
  var famousPeopleAtBrown = [
    "John D. Rockefeller Jr.",
    "Emma Watson",
    "John Krasinski",
    "Ted Turner",
    "Maurice Sendak",
    "Natalie Portman",
    "Jhumpa Lahiri",
    "Julianne Moore",
    "Reed Hastings",
    "John D. Rockerfeller III",
    "Seth MacFarlane",
    "Vanessa Williams",
    "Angela Davis",
    "Ted Danson",
    "Michael Eisner",
    "Bobby Kennedy Jr.",
    "David Cicilline",
    "Bobby Jindal",
    "Patricia Churchland",
    "Stephen Kinzer",
  ];
  const brownActivities = [
    "Attending a lecture at Watson",
    "Visiting the David Winton Bell Gallery",
    "Taking a tour of the Main Green",
    "Joining Brown Debate Union",
    "Attending a performance at the Granoff Center for the Creative Arts",
    "Studying in the Rockefeller Library",
    "Exploring the Brown University Biological Preserve",
    "Attending a Brown vs Harvard football game",
    "Visiting the Brown Arts Initiative",
    "Taking a walk along the nearby Blackstone Boulevard",
    "Visiting the Haffenreffer Museum of Anthropology",
    "Volunteering with the Swearer Center for Public Service",
    "Attending a performance at the Brown/Trinity Playwrights Rep",
    "Visiting the Office of the Chaplains",
    "Taking a free yoga class at the Brown University Mindfulness Center",
    "Visiting the Cogut Center for the Humanities",
    "Joining the Brown University Outdoor Leadership Training Program",
    "Attending a concert at the Brown University Concert Agency",
    "Visiting the Alpert Medical School",
    "Munching in the Ratty",
    "Hooping in the OMAC",
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
              placeholder="Isaac Newton"
              onChange={handleNameChange}
              disabled={buttonLoading}
              defaultValue={name}
            />
          </FormControl>
          <FormControl isRequired pt={{ sm: 5, base: 2 }}>
            <FormLabel>Character's Favorite Activity</FormLabel>
            <Input
              placeholder="Hiking"
              onChange={handleActivityChange}
              disabled={buttonLoading}
              defaultValue={activity}
            />
          </FormControl>
          <FormControl isRequired pt={{ sm: 5, base: 2 }}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Providence, Rhode Island"
              onChange={handleLocationChange}
              disabled={buttonLoading}
              defaultValue={location}
            />
          </FormControl>
        </Container>
        <Flex
          flexDir={{ sm: "row", base: "column" }}
          alignItems={"center"}
          pt={5}
        >
          <Button
            colorScheme={"green"}
            type={"submit"}
            w={"min-content"}
            isLoading={buttonLoading}
            mr={1}
          >
            Generate Your Story 👻
          </Button>
          <Flex mt={{ sm: 0, base: 1 }}>
            <Button
              colorScheme={"teal"}
              mr={1}
              onClick={handleRandomize}
              w={"min-content"}
              isDisabled={buttonLoading}
            >
              🎲
            </Button>
            <Button
              colorScheme={"orange"}
              onClick={handleBrownRandomize}
              w={"min-content"}
              isDisabled={buttonLoading}
            >
              🐻🤎
            </Button>
          </Flex>
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
