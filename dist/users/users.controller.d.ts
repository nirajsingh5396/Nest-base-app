import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';
import { IUser } from './interafaces/user-interaface';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(user: CreateUserDto): Promise<IUser>;
    findall(): Observable<IUser[]>;
    findone(id: string): Promise<IUser>;
    update(id: string, user: UpdateUserDto): Observable<IUser>;
    remove(id: string): Promise<IUser>;
}
