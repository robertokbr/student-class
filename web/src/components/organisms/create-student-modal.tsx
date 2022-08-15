/* eslint-disable react/no-children-prop */
import { useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
  Text,
  useToast,
  Image
} from "@chakra-ui/react"
import React, { cloneElement, useCallback, useState } from "react"
import { FaUserEdit } from "react-icons/fa"
import { MdMarkEmailUnread } from "react-icons/md"
import { useClass } from "../../states/hooks/use-class"
import { StudentCard } from "../molecules/student-card"

export function CreateStudentModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const Toast = useToast();
  const { setStudents, students, handleCreateStudent } = useClass();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(async () => {
    const response = await handleCreateStudent({ name, email });

    if (!response.message) {
      setStudents([...students, response]);
    } else {

      Toast({
        title: response.message,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }

    setEmail('');
    setName('');
    onClose();
  },[handleCreateStudent, name, email, onClose, setStudents, students, Toast]);

  return (
    <>
      {cloneElement(children, { onClick: onOpen })}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Register a student</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={FaUserEdit}/>}
                />
                <Input
                  type="text"
                  ref={initialRef}
                  placeholder='Name'
                  variant="filled"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mt="4">
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={MdMarkEmailUnread}/>}
                />
                <Input
                type="email"
                placeholder='E-Mail'
                variant="filled"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <Box bg="gray.700" maxH="200" overflow="auto">
            {students.length!! ? (
              students.map(({ email, name, id }) => (
                <StudentCard key={id} data={{ email, name }}/>
              ))
            ):(
              <Image mx="auto "src="/no-data.svg" alt="No data" h="200"/>
            )}
          </Box>

          <ModalFooter>
            <Button bg="gray.600" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button bg="pink.400"onClick={onClose}>Cancel</Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
}
