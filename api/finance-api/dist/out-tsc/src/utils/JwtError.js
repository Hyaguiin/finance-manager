export class JwtError extends Error {
    token;
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
