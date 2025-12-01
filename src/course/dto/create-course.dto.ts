import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { CourseLevel } from '../enums/course-level.enum';
import { CourseLanguage } from '../enums/course-language.enum';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Kurs başlığı boş olamaz' })
  title: string;

  @IsNotEmpty({ message: 'Açıklama boş olamaz' })
  description: string;

  @IsOptional()
  thumbnail?: string;

  @IsBoolean()
  isFree: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Fiyat 0 dan küçük olamaz' })
  price?: number;

  @IsEnum(CourseLevel, { message: 'Geçerli bir seviye seçiniz' })
  level: CourseLevel;

  @IsEnum(CourseLanguage, { message: 'Geçerli bir dil seçiniz' })
  language: CourseLanguage;

  @IsArray()
  @IsUUID('4', { each: true, message: 'Geçerli kategori ID leri giriniz' })
  categoryIds: string[];
}
