import {
  Button,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const Stories = () => {
  const handleRowClick = () => {
    window.location.href = "/#/story/yards";
  };

  return (
    <Stack p={"10"} bgColor={"#fcfcfc"} rounded={"lg"} shadow={"xl"}>
      <TableContainer>
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
              _hover={{ backgroundColor: "#f0f0f0f0" }}
            >
              <Td>yards</Td>
              <Td>Jan 28th, 9:38pm</Td>
              <Td isNumeric>1,234</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>
                <Button>More Stories</Button>
              </Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Stack>
  );
};
