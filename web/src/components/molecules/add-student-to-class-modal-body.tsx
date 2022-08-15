import { Image, ModalBody, Box } from "@chakra-ui/react";
import { StudentCard } from "./student-card";

export function AddStudentToClassModalBody({ data: students, handler }) {
  return (
    <ModalBody pb={6}>
      <Box bg="gray.700" maxH="300" overflow="auto">
        {students.length!! ? (
          students.map(({ email, name, id, isSelectable }) => (
            <StudentCard
              key={id}
              data={{ email, name }}
              isSelectable={isSelectable}
              handler={() => handler(id)}
            />
          ))
        ):(
          <Image mx="auto "src="/no-data.svg" alt="No data" h="200"/>
        )}
      </Box>
    </ModalBody>
  );
}
