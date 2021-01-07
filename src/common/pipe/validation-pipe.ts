import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IUser } from 'src/users/interafaces/user-interaface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  constructor(private readonly userService: UsersService) {

  }
  async transform(value: IUser, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, error: errors[0].constraints });
    }

    //Checking if email exist
    const isEmail = await this.isEmailExist(value.email)
    if (isEmail) {
      throw new BadRequestException(`${value.email} already exists`);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  async isEmailExist(email: string): Promise<Boolean> {
    
    const user = await this.userService.isEmailExist(email);
     return user ? true : false;
     
  }

}