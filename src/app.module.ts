import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.conf.${process.env.STAGE}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mongodb",
        url: configService.get("DB_URL"),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [
          Lesson,
        ]
      })
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule
],
})
export class AppModule {}
