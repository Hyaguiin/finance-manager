"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtError = void 0;
class JwtError extends Error {
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
exports.JwtError = JwtError;
