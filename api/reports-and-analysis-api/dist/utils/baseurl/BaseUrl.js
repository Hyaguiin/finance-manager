"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.databaseURL = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = (0, envalid_1.cleanEnv)(process.env, {
    DATABASE_URL: (0, envalid_1.str)(),
    PORT: (0, envalid_1.str)({ default: '6500' })
});
exports.databaseURL = env.DATABASE_URL;
exports.PORT = env.PORT;
