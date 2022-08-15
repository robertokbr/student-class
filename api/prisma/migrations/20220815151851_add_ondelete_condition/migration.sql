-- DropForeignKey
ALTER TABLE "ClassStudents" DROP CONSTRAINT "ClassStudents_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassStudents" DROP CONSTRAINT "ClassStudents_studentId_fkey";

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
