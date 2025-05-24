export class JwtError extends Error {
    token?: string;
  
    constructor(message: string = 'JWT Error', token?: string) {
      super(message);
      if(!token){
        throw new Error(`Invalid Token`);
      }
      this.name = 'JwtError';
      this.token = token;
      Object.setPrototypeOf(this, JwtError.prototype); 
    }
  }
  