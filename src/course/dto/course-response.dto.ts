import { Expose, Type } from 'class-transformer';
import { CourseLevel } from '../enums/course-level.enum';
import { CourseLanguage } from '../enums/course-language.enum';
import { CourseStatus } from '../enums/course-status.enum';
import { InstructorResponseDto } from './instructor-response.dto';
import { CategoryResponseDto } from './category-response.dto';

export class CourseResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  thumbnail: string;

  @Expose()
  isFree: boolean;

  @Expose()
  price: number;

  @Expose()
  level: CourseLevel;

  @Expose()
  language: CourseLanguage;

  @Expose()
  duration: number;

  @Expose()
  status: CourseStatus;

  @Expose()
  @Type(() => InstructorResponseDto)
  instructor: InstructorResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
