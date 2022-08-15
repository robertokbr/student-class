import { Flex } from "@chakra-ui/react";
import { FloatButton } from "../components/molecules/float-button";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useEffect } from "react";
import { ClassCards } from "../components/templates/class-cards";
import { useClass } from "../states/hooks/use-class";
import { CreateStudentButton } from "../components/templates/create-student-button";
import { baseURL } from "../api";

export default function Home({
  classesData,
  studentsData,
}) {
  const { setStudents, handleCreateClass, setClasses } = useClass();

  useEffect(() => {
    setClasses(classesData)
    setStudents(studentsData);
  }, [setStudents, studentsData, setClasses, classesData]);

  return (
    <Flex w="100vw" minH="100vh" align="flex-start" p="8" position="relative">
      <ClassCards />
      <CreateStudentButton/>
      <FloatButton icon={FaChalkboardTeacher} top="86vh" onClick={handleCreateClass}/>
    </Flex>
  );
}

export async function getServerSideProps() {
  const [classesData, studentsData] = await Promise.all([
    fetch(baseURL + "/classes").then((res) => res.json()),
    fetch(baseURL + "/students").then((res) => res.json()),
  ]);

  return {
    props: {
      classesData,
      studentsData,
    },
  };
}
