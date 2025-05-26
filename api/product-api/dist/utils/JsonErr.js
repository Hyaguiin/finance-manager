"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonErro = void 0;
class JsonErro extends Error {
    constructor(message = "This object is not a json") {
        super(message);
        this.name = "Please insert a json";
    }
}
exports.JsonErro = JsonErro;
