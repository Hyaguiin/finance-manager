"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedOnCreate = void 0;
class FailedOnCreate extends Error {
    constructor(message = "Failed to create the object") {
        super(message);
        this.name = "Plase, try again";
    }
}
exports.FailedOnCreate = FailedOnCreate;
