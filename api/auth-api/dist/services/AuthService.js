"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const Unkown_1 = require("../utils/Unkown");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const uuid_1 = require("uuid");
const Uuid_1 = require("../utils/Uuid");
const NotFoundError_1 = require("../utils/NotFoundError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    constructor() {
        this.registerService = async (body) => {
            try {
                const requiredFields = ['email', 'password', 'name'];
                const missingFields = requiredFields.filter(field => !body[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Missing fields: ${missingFields.join(', ')}`);
                }
                const salt = await bcryptjs_1.default.genSalt(10);
                body.password = await bcryptjs_1.default.hash(body.password, salt);
                const register = await AuthModel_1.default.create(body);
                console.log(`User created: ${JSON.stringify(register.dataValues)}`);
                return register;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Unkown_1.UnknowError();
            }
        };
        this.getUserById = async (id) => {
            try {
                if (!id)
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                if (!(0, uuid_1.validate)(id))
                    throw new Uuid_1.UUIDNotFoundError();
                const user = await AuthModel_1.default.findOne({ where: { id } });
                if (!user)
                    throw new NotFoundError_1.NotFound();
                console.log(`User found: ${JSON.stringify(user.dataValues)}`);
                return user;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Unkown_1.UnknowError();
            }
        };
        this.deleteUser = async (id) => {
            try {
                if (!id)
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                if (!(0, uuid_1.validate)(id))
                    throw new Uuid_1.UUIDNotFoundError();
                const user = await this.getUserById(id);
                if (!user)
                    throw new NotFoundError_1.NotFound();
                await AuthModel_1.default.destroy({ where: { id } });
                console.log(`User deleted: ${JSON.stringify(user.dataValues)}`);
                return true;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Unkown_1.UnknowError();
            }
        };
        this.compareHashPassword = async (plainPassword, hashedPassword) => {
            try {
                const isMatch = await bcryptjs_1.default.compare(plainPassword, hashedPassword);
                if (isMatch) {
                    console.log(`Passwords match!`);
                }
                else {
                    console.log(`Passwords do not match.`);
                }
                return isMatch;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Erro: ${err.message}`);
                }
                throw new Unkown_1.UnknowError();
            }
        };
    }
}
exports.AuthService = AuthService;
