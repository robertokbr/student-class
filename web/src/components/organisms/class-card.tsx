import { Box, Editable, EditableInput, EditablePreview, Flex, HStack, Icon, Text, Tooltip, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { baseURL } from "../../api";
import { useClass } from "../../states/hooks/use-class";

export function ClassCard({
  data: {
    id,
    name,
    students,
  },
  ...props
}) {
  const tooltipText = students?.length !== 1 ? `students` : "student";
  const [className, setClassName] = useState(name);
  const toast = useToast();
  const { handleUpdateClassName } = useClass();

  const handleUpdateClass = useCallback( async () => {
    if (className && name !== className) {
      const data = await handleUpdateClassName({ classId: id, className });

      if (data.message) {
        setClassName(name);

        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }
    }
  } ,[className, handleUpdateClassName, id, name, toast]);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setClassName(event.target.value);
  }, []);

  return (
    <Box
      bg="gray.800"
      borderRadius="16px"
      maxW="326px"
      h="20rem"
      w="100%"
      border="2px solid transparent"
      transition="0.2s"
      _hover={{
        borderColor: "purple.400",
        transform: "scale(1.02)",
      }}
    >
      <Flex borderRadius="16px" bg="gray.800" p="4" h="80%" align="center" justify="center">
        <Editable
          value={className || 'Click here to give it a name'}
          fontWeight="bold"
          fontSize="4xl"
          color="gray.50"
          textAlign="center"
          onSubmit={handleUpdateClass}
        >
          <EditablePreview/>
          <EditableInput onChange={handleInputChange} />
        </Editable>
      </Flex>
      <Flex h="0.05px" bg="gray.50" w="90%" mx="auto" opacity="0.1"/>
      <Flex p="4" cursor="pointer" justify="flex-end">
        <Tooltip label={`This class has ${students?.length || 0} ${tooltipText}`} >
          <HStack spacing="2"  {...props}>
            <Icon as={BsFillFileEarmarkPersonFill} color="pink.400"/>
            <Text color="gray.50">
              x {students?.length || 0}
            </Text>
          </HStack>
        </Tooltip>
      </Flex>
    </Box>
  );
}
