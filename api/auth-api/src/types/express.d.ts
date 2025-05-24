declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      userEmail: string;
      [key: string]: any;
    };
  }
}
