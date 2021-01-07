import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserJoiSchema } from 'src/common/pipe/create-user-joi-schema';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation-pipe';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';
import { ValidationPipe } from '../common/pipe/validation-pipe';
import { IUser } from './interafaces/user-interaface';
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Post()
  async create(@Body(ValidationPipe) user: CreateUserDto): Promise<IUser> {
    return this.userService.create(user);
  }

  @Get()
  findall(): Observable<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findone(@Param('id') id: string): Promise<IUser> {
    return this.userService.findone(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto): Observable<IUser> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.remove(id);
  }
}
