"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserJoiSchema = void 0;
const joi = require("@hapi/joi");
class CreateUserJoiSchema {
    static createUser() {
        return joi.object({
            name: joi.string().min(6).required(),
            email: joi.string().min(6).required().email(),
            password: joi.string().min(6).required()
        });
    }
}
exports.CreateUserJoiSchema = CreateUserJoiSchema;
//# sourceMappingURL=create-user-joi-schema.js.map