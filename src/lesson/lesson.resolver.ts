import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(_of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
    ) {}
    @Query(_returns => LessonType)
    lesson() {
        return {
            id: "4542343",
            name: "Django",
            startDate: "1996-09-01",
            endDate: "2021-09-01"
        }
    }

    @Mutation(_returns => LessonType)
    createLesson(
        @Args("name") name: string,
        @Args("startDate") startDate: string,
        @Args("endDate") endDate: string
    ) {
        return this.lessonService.createLesson(name, startDate, endDate)
    }
}