export class JwtError extends Error {
    constructor(message = 'JWT Error', token) {
        super(message);
        if (!token) {
            throw new Error(`Invalid Token`);
        }
        this.name = 'JwtError';
        this.token = token;
        Object.setPrototypeOf(this, JwtError.prototype);
    }
}
