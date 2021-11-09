import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(_of => StudentType)
export class StudentResolver {

  constructor(private studentService: StudentService) {}

  @Mutation(_returns => StudentType)
  async createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput
  ) {
    return this.studentService.createStudent(createStudentInput)
  }

  @Query(_returns => [StudentType])
  async students() {
    return this.studentService.getStudents()
  }

  @Query(_returns => StudentType)
  async studentById(
    @Args("studentId") studentId: string
  ) {
    return this.studentService.getStudentById(studentId)
  }
}