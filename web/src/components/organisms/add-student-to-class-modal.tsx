import { useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useToast,
} from "@chakra-ui/react"
import React, { cloneElement, useCallback, useMemo, useState } from "react"
import { useClass } from "../../states/hooks/use-class";
import { AddStudentToClassModalBody } from "../molecules/add-student-to-class-modal-body";

export function AddStudentToClassModal({ children, data: classData }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const Toast = useToast();
  const [studentIds, setStudentIds] = useState([]);

  const {
    students: studentsData,
    handleUpdateClasses,
    handleAddStudentToClass
  } = useClass();

  const students = useMemo(() => {
    return studentsData.map(
      student => classData.students.map(s => s.id).includes(student.id)
        ? student
        : ({ ...student, isSelectable: true })
    )
  }, [classData, studentsData]);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleSubmit = useCallback(async () => {
    if (!studentIds.length) return;

    const response = await handleAddStudentToClass({
      studentIds,
      classId: classData.id
    });

    if (!response.message) {
      handleUpdateClasses(response);
    } else {
      Toast({
        title: response.message,
        status: "error",
        duration: 9000,
        isClosable: true
      });
    }

    setStudentIds([]);
    onClose();
  },[handleAddStudentToClass, studentIds, classData.id, onClose, handleUpdateClasses, Toast]);

  const toggleAddStudent = useCallback(studentId => {
    if (studentIds.includes(studentId)) {
      return setStudentIds(studentIds.filter(id => id !== studentId));
    }

    setStudentIds([...studentIds, studentId]);
  } ,[studentIds]);

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
          <AddStudentToClassModalBody handler={toggleAddStudent} data={students}/>
          <ModalFooter>
            <Button bg="gray.600" mr={3} onClick={handleSubmit}>
              Confirm
            </Button>
            <Button bg="pink.400"onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
