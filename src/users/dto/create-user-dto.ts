import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString()
  @Length(6, 255)
  readonly name: string;

  @IsString()
  @Length(6, 255)
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 1024)
  password: string;
  
}