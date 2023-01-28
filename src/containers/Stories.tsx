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

export const Stories = () => {
  const handleRowClick = () => {
    window.location.href = "/#/story/yards";
  };

  return (
    <>
      <TableContainer>
        <Heading
          size="sm"
          textAlign={"center"}
          mb={"4"}
          fontFamily={"Bakbak One"}
        >
          POPULAR
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
            <Tr
              onClick={handleRowClick}
              _hover={{ backgroundColor: "#f0f0f0f0", cursor: "pointer" }}
            >
              <Td>yards</Td>
              <Td>Jan 28th, 9:38pm</Td>
              <Td isNumeric>1,234</Td>
            </Tr>
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
          RECENT
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
            <Tr
              onClick={handleRowClick}
              _hover={{ backgroundColor: "#f0f0f0f0", cursor: "pointer" }}
            >
              <Td>yards</Td>
              <Td>Jan 28th, 9:38pm</Td>
              <Td isNumeric>1,234</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
