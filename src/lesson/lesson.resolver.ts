import { Query, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";

@Resolver(_of => LessonType)
export class LessonResolver {
    @Query(_returns => LessonType)
    lesson() {
        return {
            id: "4542343",
            name: "Django",
            startDate: "1996-09-01",
            endDate: "2021-09-01"
        }
    }
}