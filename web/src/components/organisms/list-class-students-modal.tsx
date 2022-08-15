import { useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react"
import React, { cloneElement } from "react"
import { StudentCard } from "../molecules/student-card"

export function ListClassStudentsModal({ children, data: classData}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

          <ModalHeader>Add students to class</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box bg="gray.700" overflow="scroll">
              {classData.students.map(({ email, name, id }) => (
                <StudentCard key={id} data={{ email, name }} />
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
