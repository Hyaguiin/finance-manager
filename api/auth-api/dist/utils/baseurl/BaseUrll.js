"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_expires = exports.jwt_Secret = exports.PORT = exports.databaseURL = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = (0, envalid_1.cleanEnv)(process.env, {
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_EXPIRES: (0, envalid_1.str)({ default: '1h' }),
    DATABASE_URL: (0, envalid_1.str)(),
    PORT: (0, envalid_1.str)({ default: '5000' })
});
exports.databaseURL = env.DATABASE_URL;
exports.PORT = env.PORT;
exports.jwt_Secret = env.JWT_SECRET;
exports.jwt_expires = env.JWT_EXPIRES;
