import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([Course]), CategoryModule],
})
export class CourseModule {}
