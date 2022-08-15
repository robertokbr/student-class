import { Image } from "@chakra-ui/react";
import { useClass } from "../../states/hooks/use-class";
import { Container } from "../atoms/container";
import { ClassCard } from "../organisms/class-card";
import { AddStudentToClassModal } from "../organisms/add-student-to-class-modal";

export function ClassCards() {
  const { classes } = useClass();

  return (
    <>
      {classes.length!! ? (
          <Container>
            {classes.map(classData => (
              <AddStudentToClassModal key={classData.id} data={classData}>
                <ClassCard data={classData} />
              </AddStudentToClassModal>
            ))}
          </Container>
        ):(
          <Image src="/astronaut.svg" alt="No classes" m="auto" />
        )}
    </>
  );
}
