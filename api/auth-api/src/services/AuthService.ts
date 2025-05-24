import { UserCreationAttributes } from "../interfaces/AuthInterface";
import User from "../models/AuthModel";
import { UnknowError } from "../utils/Unkown";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { validate as isUuid } from "uuid";
import { UUIDNotFoundError } from "../utils/Uuid";
import { NotFound } from "../utils/NotFoundError";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor() {}

  registerService = async (body: UserCreationAttributes) => {
    try {
      const requiredFields: (keyof UserCreationAttributes)[] = ['email', 'password', 'name'];
      const missingFields = requiredFields.filter(field => !body[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
      }

      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);

      const register = await User.create(body);
      console.log(`User created: ${JSON.stringify(register.dataValues)}`);
      return register;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new UnknowError();
    }
  };

  getUserById = async (id: string) => {
    try {
      if (!id) throw new ErrorMissingContent();
      if (!isUuid(id)) throw new UUIDNotFoundError();

      const user = await User.findOne({ where: { id } });

      if (!user) throw new NotFound();

      console.log(`User found: ${JSON.stringify(user.dataValues)}`);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new UnknowError();
    }
  };

  deleteUser = async (id: string) => {
    try {
      if (!id) throw new ErrorMissingContent();
      if (!isUuid(id)) throw new UUIDNotFoundError();

      const user = await this.getUserById(id); 
      if (!user) throw new NotFound();

      await User.destroy({ where: { id } });
      console.log(`User deleted: ${JSON.stringify(user.dataValues)}`);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new UnknowError();
    }
  };

  compareHashPassword = async (plainPassword: string, hashedPassword: string) => {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      if (isMatch) {
        console.log(`Passwords match!`);
      } else {
        console.log(`Passwords do not match.`);
      }
      return isMatch;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro: ${err.message}`);
      }
      throw new UnknowError();
    }
  };
  


}
