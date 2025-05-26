"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToDelete = void 0;
class FailedToDelete extends Error {
    constructor(message = "Failed to Delete!!") {
        super(message);
        this.name = "FailedToDelete";
    }
}
exports.FailedToDelete = FailedToDelete;
