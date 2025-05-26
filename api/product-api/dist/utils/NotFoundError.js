"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
class NotFound extends Error {
    constructor(message = "Not Found!") {
        super(message);
        this.name = "NotFound";
    }
}
exports.NotFound = NotFound;
