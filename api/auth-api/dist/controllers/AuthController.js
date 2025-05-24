"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const Unkown_1 = require("../utils/Unkown");
const BaseUrll_1 = require("../utils/baseurl/BaseUrll");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NotFoundError_1 = require("../utils/NotFoundError");
const JwtError_1 = require("../utils/JwtError");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const { name, email, password, cpf, cnpj } = req.body;
            try {
                if (!name || !email || !password) {
                    res.status(400).json({
                        success: false,
                        message: `Campos obrigatórios ausentes: name, email, password`,
                    });
                    return;
                }
                const registeredUser = await this.authService.registerService({
                    name,
                    email,
                    password,
                    cpf,
                    cnpj,
                });
                const token = jsonwebtoken_1.default.sign({
                    userId: registeredUser.id,
                    userEmail: registeredUser.email,
                }, BaseUrll_1.jwt_Secret, { expiresIn: "1h" });
                res.status(201).json({
                    success: true,
                    message: "Usuário registrado com sucesso!",
                    data: {
                        user: {
                            id: registeredUser.id,
                            name: registeredUser.name,
                            email: registeredUser.email,
                        },
                        token,
                    },
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({
                        success: false,
                        message: `Erro interno: ${err.message}`,
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: `Erro desconhecido: ${new Unkown_1.UnknowError().message}`,
                    });
                }
            }
        };
        this.login = async (req, res) => {
            const { email, password } = req.body;
            try {
                if (!email || !password) {
                    res
                        .status(500)
                        .json({ sucess: false, message: `Error: ${ErrorMissingContent_1.ErrorMissingContent}` });
                    return;
                }
                const login = await AuthModel_1.default.findOne({ where: { email: email } });
                if (!login) {
                    res
                        .status(400)
                        .json({ sucess: false, message: `Failed to find: ${NotFoundError_1.NotFound}` });
                    return;
                }
                const isPasswordCorret = bcryptjs_1.default.compare(password, login.password);
                if (!isPasswordCorret) {
                    res
                        .status(400)
                        .json({ sucess: false, message: `the Password is not Match!` });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ userId: login.id, userEmail: login.email }, BaseUrll_1.jwt_Secret, { expiresIn: "1h" });
                if (!token) {
                    res.status(400).json({ sucess: false, message: `error: ${JwtError_1.JwtError}` });
                    return;
                }
                res.status(200).json({
                    sucess: true,
                    message: `Authenticated: ${JSON.stringify(login?.dataValues)}`,
                    token,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({
                        success: false,
                        message: `Erro interno: ${err.message}`,
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: `Erro desconhecido: ${new Unkown_1.UnknowError().message}`,
                    });
                    return;
                }
            }
        };
        this.getUsersAfterLogin = async (req, res) => {
            try {
                const token = req.headers.authorization?.split(' ')[1];
                if (!token) {
                    res.status(401).json({ success: false, message: "Token not provided" });
                    return;
                }
                const decoded = jsonwebtoken_1.default.verify(token, BaseUrll_1.jwt_Secret);
                const users = await this.authService.getAllUsers();
                if (!users || users.length === 0) {
                    res.status(404).json({ success: false, message: "No users found" });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: "All users retrieved successfully",
                    users: users.map(user => ({
                        id: user.id,
                        email: user.email,
                        decoded
                    }))
                });
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    res.status(401).json({ success: false, message: "Invalid token" });
                }
                else if (err instanceof Error) {
                    res.status(500).json({ success: false, message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ success: false, message: "Unknown error occurred" });
                }
            }
        };
        this.validateToken = async (req, res) => {
            const { token = req.headers.authorization?.split(" ")[1] } = req.body;
            try {
                if (!token) {
                    res
                        .status(500)
                        .json({ sucess: false, message: `Error: ${ErrorMissingContent_1.ErrorMissingContent}` });
                    return;
                }
                const decode = jsonwebtoken_1.default.verify(token, BaseUrll_1.jwt_Secret);
                if (!decode) {
                    res.status(400).json({ sucess: false, message: `${JwtError_1.JwtError}` });
                    return;
                }
                res
                    .status(200)
                    .json({ sucess: true, message: `Sucess! is a valid token!`, decode });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({
                        success: false,
                        message: `Erro interno: ${err.message}`,
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: `Erro desconhecido: ${new Unkown_1.UnknowError().message}`,
                    });
                }
            }
        };
        this.authService = new AuthService_1.AuthService();
    }
}
exports.AuthController = AuthController;
