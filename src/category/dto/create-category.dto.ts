import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Boş olamaz' })
  name: string;

  @IsOptional()
  description: string;
}
