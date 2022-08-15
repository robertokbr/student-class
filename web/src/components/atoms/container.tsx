import { SimpleGrid } from "@chakra-ui/react";

export function Container({ children }) {
  return (
    <SimpleGrid
      flex="1"
      gap="4"
      justifyItems="center"
      gridTemplateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "1fr 1fr 1fr",
        xl: "1fr 1fr 1fr 1fr",
      }}
    >
      {children}
    </SimpleGrid>
  );
}
