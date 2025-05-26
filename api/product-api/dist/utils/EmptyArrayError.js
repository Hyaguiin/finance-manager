"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyArrayError = void 0;
class EmptyArrayError extends Error {
    constructor(message = "This Array is Empty") {
        super(message);
        this.name = "EmptyArrayError";
    }
}
exports.EmptyArrayError = EmptyArrayError;
