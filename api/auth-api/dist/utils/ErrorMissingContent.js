"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMissingContent = void 0;
class ErrorMissingContent extends Error {
    constructor(message = 'Missing content!') {
        super(message);
        this.name = "Please, the content is required";
    }
}
exports.ErrorMissingContent = ErrorMissingContent;
