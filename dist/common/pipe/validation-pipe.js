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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_interaface_1 = require("../../users/interafaces/user-interaface");
const users_service_1 = require("../../users/users.service");
let ValidationPipe = class ValidationPipe {
    constructor(userService) {
        this.userService = userService;
    }
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException({ status: common_1.HttpStatus.BAD_REQUEST, error: errors[0].constraints });
        }
        const isEmail = await this.isEmailExist(value.email);
        if (isEmail) {
            throw new common_1.BadRequestException(`${value.email} already exists`);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    async isEmailExist(email) {
        const user = await this.userService.isEmailExist(email);
        return user ? true : false;
    }
};
ValidationPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation-pipe.js.map