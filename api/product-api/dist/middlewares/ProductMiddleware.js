"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeProductOwner = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const authorizeProductOwner = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel_1.default.findByPk(productId);
        if (!product) {
            res
                .status(404)
                .json({ message: "Produto/serviço não encontrado" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};
exports.authorizeProductOwner = authorizeProductOwner;
