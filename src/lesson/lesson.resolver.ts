import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(_of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}
    
    @Query(_returns => LessonType)
    lesson(
        @Args("id") id: string
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(_returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(_returns => LessonType)
    createLesson(
        @Args("createLessonInput") createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(_returns => LessonType)
    assignStudentsToLesson(
        @Args("assignStudentsToLessonInput") assignStudentsInputToLessonInput: AssignStudentsToLessonInput
    ) {
        const { lessonId, studentIds } = assignStudentsInputToLessonInput
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students);
    }
}