"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = void 0;
class ServiceError extends Error {
    constructor(message = `The Service is Failed`) {
        super(message);
        this.name = `ServiceError`;
    }
}
exports.ServiceError = ServiceError;
