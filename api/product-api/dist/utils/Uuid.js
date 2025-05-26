"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDNotFoundError = void 0;
class UUIDNotFoundError extends Error {
    constructor(message = "UUID not found") {
        super(message);
        this.name = "UUIDNotFoundError";
    }
}
exports.UUIDNotFoundError = UUIDNotFoundError;
