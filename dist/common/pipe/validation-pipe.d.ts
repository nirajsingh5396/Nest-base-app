import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { IUser } from 'src/users/interafaces/user-interaface';
import { UsersService } from 'src/users/users.service';
export declare class ValidationPipe implements PipeTransform<any> {
    private readonly userService;
    constructor(userService: UsersService);
    transform(value: IUser, { metatype }: ArgumentMetadata): Promise<IUser>;
    private toValidate;
    isEmailExist(email: string): Promise<Boolean>;
}
