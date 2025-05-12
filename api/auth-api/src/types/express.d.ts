import { UserAttributes } from '../interfaces/AuthInterface';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; 
    }
  }
}

declare namespace Express {
  export interface Request {
    user?: JwtPayload | UserAttributes | string | undefined;
  }
}