import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/AuthModel';
import { UserCreationAttributes } from '../interfaces/AuthInterface';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';
import { InvalidCredentialsError } from '../utils/InvalidCreationAttributes';
import { UnknowError } from '../utils/Unkown';
import { jwt_Secret as SECRET_KEY } from '../utils/baseurl/BaseUrll';

class AuthService {

  async register(name: string, email: string, password: string, cpf: string, cnpj?: string): Promise<void> {
    try {
      if (!name || !email || !password || !cpf) {
        throw new ErrorMissingContent();
      }

      const userExists = await UserModel.findOne({ where: { email } });
      if (userExists) {
        throw new Error('Email já cadastrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ name, email, password: hashedPassword, cpf, cnpj } as UserCreationAttributes);
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new UnknowError();
    }
  }

  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    try {
      if (!email || !password) {
        throw new ErrorMissingContent();
      }

      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        throw new InvalidCredentialsError();
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new InvalidCredentialsError();
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return { user, token };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new UnknowError();
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      if (!token) {
        throw new ErrorMissingContent();
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new UnknowError();
    }
  }
}

export default new AuthService();
