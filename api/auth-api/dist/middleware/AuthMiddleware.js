"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BaseUrll_1 = require("../utils/baseurl/BaseUrll");
const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Erro: Token não fornecido.",
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, BaseUrll_1.jwt_Secret);
        if (typeof decoded === "string") {
            res.status(401).json({
                success: false,
                message: "Erro: Token inválido.",
            });
            return;
        }
        req.user = {
            userId: decoded["userId"],
            userEmail: decoded["userEmail"],
        };
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Erro ao verificar o token.",
        });
    }
};
exports.authMiddleware = authMiddleware;
