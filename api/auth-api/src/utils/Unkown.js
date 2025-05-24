"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknowError = void 0;
class UnknowError extends Error {
    constructor(message = "Unknow Error!") {
        super(message);
        this.name = "Please verify the content, Unknow error";
    }
}
exports.UnknowError = UnknowError;
