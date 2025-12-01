import { Expose } from 'class-transformer';

export class InstructorResponseDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  avatar: string;
}