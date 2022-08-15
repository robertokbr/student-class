import { createContext, useCallback, useState } from "react";
import { baseURL } from "../../api";

interface IClassContext {
  students: any[];
  setStudents: (students: any[]) => void;
  classes: any[];
  setClasses: (classes: any[]) => void;
  handleCreateClass: () => Promise<void>;
  handleUpdateClasses: (updatedClass: Record<string, unknown>) => void;
  handleCreateStudent: ({ name, email }) => Promise<any>;
  handleAddStudentToClass: ({ studentIds, classId }) => Promise<any>;
  handleUpdateClassName: ({ classId, className }) => Promise<any>;
}

const headers = {
  "Content-Type": "application/json",
};

export const ClassContext = createContext({} as IClassContext);

export function ClassProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleCreateClass = useCallback(async () => {
    const classData = await fetch(baseURL + '/classes', {
      method: 'POST',
      headers,
    }).then(res => res.json());

    setClasses([...classes, classData]);
  }, [classes]);

  const handleCreateStudent = useCallback(async ({ name, email }) => {
    return fetch(baseURL + "/students", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(data => data.json());
  }, []);

  const handleAddStudentToClass = useCallback(async ({ studentIds, classId }) => {
    return fetch(baseURL + `/classes/${classId}/students` , {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        studentIds,
      }),
    }).then(res => res.json());
  }, []);

  const handleUpdateClassName = useCallback(async ({ classId, className }) => {
    return fetch(baseURL + `/classes/${classId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: className,
      }),
    }).then(res => res.json());
  }, []);

  const handleUpdateClasses = useCallback((updatedClass) => {
    setClasses(classes.map(
      classItem => classItem.id === updatedClass.id
        ? updatedClass
        : classItem,
    ));
  } ,[classes]);

  return (
    <ClassContext.Provider
      value={{
        students,
        setStudents,
        classes,
        setClasses,
        handleCreateClass,
        handleUpdateClasses,
        handleCreateStudent,
        handleAddStudentToClass,
        handleUpdateClassName,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}
