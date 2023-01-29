import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

export const Stories = () => {
  const handleRowClick = (hash: string) => {
    window.location.href = hash;
  };

  const [popularStories, setPopularStories] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://hb-server.herokuapp.com/story/getrecentstory")
      .then((res) => {
        setStories(res.data.result);
      });
    axios
      .get("https://hb-server.herokuapp.com/story/getpopularstory")
      .then((res) => {
        setPopularStories(res.data.result);
      });
  }, []);

  return (
    <>
      <TableContainer>
        <Heading
          size="sm"
          textAlign={"center"}
          mb={"4"}
          fontFamily={"Bakbak One"}
        >
          POPULAR ✨
        </Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Story Name</Th>
              <Th>Created</Th>
              <Th isNumeric>Views</Th>
            </Tr>
          </Thead>
          <Tbody>
            {popularStories.map(({ title, date, views, id }: any) => {
              return (
                <Tr
                  onClick={() => handleRowClick("/#story/" + id)}
                  key={id}
                  _hover={{ backgroundColor: "#f0f0f0f0", cursor: "pointer" }}
                >
                  <Td>
                    {title.substring(0, title.length > 70 ? 70 : title.length)}
                    {title.length > 70 && "..."}
                  </Td>
                  <Td>{new Date(date).toLocaleDateString()}</Td>
                  <Td isNumeric>{views}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Heading
          size="sm"
          textAlign={"center"}
          mb={"4"}
          mt={"10"}
          fontFamily={"Bakbak One"}
        >
          RECENT ⌛
        </Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Story Name</Th>
              <Th>Created</Th>
              <Th isNumeric>Views</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stories.map(({ title, date, views, id }: any) => {
              return (
                <Tr
                  onClick={() => handleRowClick("#story/" + id)}
                  key={id}
                  _hover={{ backgroundColor: "#f0f0f0f0", cursor: "pointer" }}
                >
                  <Td>
                    {title.substring(0, title.length > 70 ? 70 : title.length)}
                    {title.length > 70 && "..."}
                  </Td>
                  <Td>{new Date(date).toLocaleTimeString()}</Td>
                  <Td isNumeric>{views}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
