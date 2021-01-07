import { ObjectSchema } from '@hapi/joi';
import * as joi from '@hapi/joi';


export class CreateUserJoiSchema {
  static createUser(): ObjectSchema {
    return joi.object({
      name: joi.string().min(6).required(),
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required()
    })
  }
}