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
  return (
    <Stack p={"10"} bgColor={"#fcfcfc"} rounded={"lg"} shadow={"xl"}>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Story Name</Th>
              <Th>Created</Th>
              <Th isNumeric>Read</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>yards</Td>
              <Td>Jan 28th, 9:38pm</Td>
              <Td isNumeric>
                <Link>Read</Link>
              </Td>
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
