import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { from, Observable } from 'rxjs';
import { UpdateUserDto } from './dto/update-user-dto';
import { IUser } from './interafaces/user-interaface';
import * as bcrypt from 'bcrypt';
@Injectable()

export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<IUser>) { }

 async create(user: CreateUserDto): Promise<IUser> {
    const hashPassword = await this.GetHashPassword(user.password) as string;
    user.password = hashPassword
    try {
      const createUser = new this.userModel(user);
      return createUser.save();
    } catch (err) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(): Observable<IUser[]> {
    try {
      return from(this.userModel.find());
    } catch (err) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findone(id: string): Promise<IUser> {
    try {
      var foundUser = await this.userModel.findOne({ _id: id });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!foundUser) {
      throw new NotFoundException(`${id} not found`);
    }
    return foundUser;
  }

  update(id: string, user: UpdateUserDto): Observable<IUser> {
    try {
      var updatedUser = from(this.userModel.findOneAndUpdate({ _id: id }, user));
    } catch (err) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!updatedUser) {
      throw new NotFoundException(`${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<IUser> {
    try {
      var removedUser = this.userModel.findOneAndRemove({ _id: id });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!removedUser) {
      throw new NotFoundException(`${id} not found`);
    }
    return removedUser;
  }

  async isEmailExist(email: string): Promise<IUser> {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (err) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async GetHashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

}
