import { Avatar, Box, Checkbox, Flex, Text } from "@chakra-ui/react";

interface StudentCardProps {
  data: any;
  handler?: any;
  isSelectable?: boolean;
}

export function StudentCard({
  handler,
  data: { name, email },
  isSelectable = false
}: StudentCardProps) {
  return (
    <Flex py="2" px="6" borderRadius="8" bg="gray.700">
      <Flex align="center" justify="space-between" w="100%">
        <Avatar name={name}/>
        <Box ml="4" mr="auto">
          <Text fontWeight="bold" fontSize="2xl">{name}</Text>
          <Text>{email}</Text>
        </Box>
        {isSelectable && <Checkbox size="lg" onChange={(e) => handler(e.target.checked)}/>}
      </Flex>
    </Flex>
  );
}
