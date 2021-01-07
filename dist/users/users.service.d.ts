import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { Observable } from 'rxjs';
import { UpdateUserDto } from './dto/update-user-dto';
import { IUser } from './interafaces/user-interaface';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    create(user: CreateUserDto): Promise<IUser>;
    findAll(): Observable<IUser[]>;
    findone(id: string): Promise<IUser>;
    update(id: string, user: UpdateUserDto): Observable<IUser>;
    remove(id: string): Promise<IUser>;
    isEmailExist(email: string): Promise<IUser>;
    GetHashPassword(password: any): Promise<any>;
}
