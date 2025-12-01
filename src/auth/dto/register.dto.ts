import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Geçerli bir email giriniz' })
  @IsNotEmpty({ message: 'Email boş olamaz' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Ad Soyad boş olamaz' })
  fullName: string;
}