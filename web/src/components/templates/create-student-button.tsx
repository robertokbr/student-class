import { FaUserPlus } from "react-icons/fa";
import { useClass } from "../../states/hooks/use-class";
import { FloatButton } from "../molecules/float-button";
import { CreateStudentModal } from "../organisms/create-student-modal";

export function CreateStudentButton() {
  const { students } = useClass();

  return (
    <CreateStudentModal>
      <FloatButton icon={FaUserPlus} top="75vh" count={students.length}/>
    </CreateStudentModal>
  );
}
