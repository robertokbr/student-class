import { Button, ButtonProps, Flex, Icon, Text } from "@chakra-ui/react";

export function FloatButton({ icon, count, ...props }: { icon: React.FC; count?: number } & ButtonProps) {
  return (
    <Button position="absolute" borderRadius="50%" h="16" w="16" right="8" {...props}>
      <Icon as={icon} h="5" w="5"/>
      {count > 0 && (
        <Flex position="relative">
          <Flex
            align="center"
            justify="center"
            h="5"
            w="5"
            borderRadius="50%"
            bg="pink.400"
            position="absolute"
            top="-2rem"
          >
            <Text fontSize="14">
              {count}
            </Text>
          </Flex>
        </Flex>
      )}
    </Button>
  );
}
