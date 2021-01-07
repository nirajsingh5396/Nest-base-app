"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const rxjs_1 = require("rxjs");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(user) {
        const hashPassword = await this.GetHashPassword(user.password);
        user.password = hashPassword;
        try {
            const createUser = new this.userModel(user);
            return createUser.save();
        }
        catch (err) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        try {
            return rxjs_1.from(this.userModel.find());
        }
        catch (err) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findone(id) {
        try {
            var foundUser = await this.userModel.findOne({ _id: id });
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!foundUser) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return foundUser;
    }
    update(id, user) {
        try {
            var updatedUser = rxjs_1.from(this.userModel.findOneAndUpdate({ _id: id }, user));
        }
        catch (err) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!updatedUser) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return updatedUser;
    }
    async remove(id) {
        try {
            var removedUser = this.userModel.findOneAndRemove({ _id: id });
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!removedUser) {
            throw new common_1.NotFoundException(`${id} not found`);
        }
        return removedUser;
    }
    async isEmailExist(email) {
        try {
            return await this.userModel.findOne({ email: email });
        }
        catch (err) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async GetHashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('users')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map