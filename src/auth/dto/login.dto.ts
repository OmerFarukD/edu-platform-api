import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Geçerli bir email giriniz' })
  @IsNotEmpty({ message: 'Email boş olamaz' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  password: string;
}