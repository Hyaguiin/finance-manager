"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const NotFoundError_1 = require("../utils/NotFoundError");
const Unkown_1 = require("../utils/Unkown");
const EmptyArrayError_1 = require("../utils/EmptyArrayError");
class ProductService {
    constructor() {
        this.createProduct = async (productData) => {
            try {
                const { type, price, description, userId } = productData;
                if (!type || !price || !description || !userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                await ProductModel_1.default.create(productData);
            }
            catch (err) {
                console.error("Error in createProduct:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in createProduct: ${JSON.stringify(err)}`);
                }
            }
        };
        this.getAllProducts = async () => {
            try {
                const products = await ProductModel_1.default.findAll();
                if (products.length === 0) {
                    throw new NotFoundError_1.NotFound();
                }
                return products;
            }
            catch (err) {
                console.error("Error in getAllProducts:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.getProductById = async (id) => {
            try {
                if (!id) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const product = await ProductModel_1.default.findOne({ where: { id } });
                if (!product) {
                    throw new NotFoundError_1.NotFound();
                }
                return product;
            }
            catch (err) {
                console.error("Error in getProductById:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in getProductById: ${JSON.stringify(err)}`);
                }
            }
        };
        this.getProductsByUser = async (userId) => {
            try {
                if (!userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent("User ID is required");
                }
                const products = await ProductModel_1.default.findAll({ where: { userId } });
                if (products.length === 0) {
                    throw new NotFoundError_1.NotFound("Nenhum produto encontrado para esse usuário");
                }
                return products;
            }
            catch (err) {
                console.error("Error in getProductsByUser:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in getProductsByUser: ${JSON.stringify(err)}`);
                }
            }
        };
        this.getAllUserIdService = async (userId, SERVICE) => {
            try {
                if (!userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent("User ID is required");
                }
                if ((await this.getAllProducts()).length === 0) {
                    throw new EmptyArrayError_1.EmptyArrayError();
                }
                const service = await ProductModel_1.default.findAll({
                    where: { userId: userId, type: SERVICE },
                });
                if (!service) {
                    throw new Error(`SERVICE NOT FOUND!`);
                }
                console.log(`Todos os serviços: ${service}`);
                return service;
            }
            catch (err) {
                if (err instanceof Error) {
                }
            }
        };
        this.getAllUserIdProducts = async (userId, PRODUCT) => {
            try {
                if ((await this.getAllProducts()).length === 0) {
                    throw new EmptyArrayError_1.EmptyArrayError();
                }
                const service = await ProductModel_1.default.findAll({
                    where: { userId: userId, type: PRODUCT },
                });
                if (!service) {
                    throw new Error(`SERVICE NOT FOUND!`);
                }
                console.log(`Todos os serviços: ${service}`);
                return service;
            }
            catch (err) {
                if (err instanceof Error) {
                }
            }
        };
        this.updateProduct = async (id, updateData) => {
            try {
                if (!id) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const product = await ProductModel_1.default.findOne({ where: { id } });
                if (!product) {
                    throw new NotFoundError_1.NotFound();
                }
                await product.update(updateData);
                return product;
            }
            catch (err) {
                console.error("Error in updateProduct:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in updateProduct: ${JSON.stringify(err)}`);
                }
            }
        };
        this.deleteProduct = async (id) => {
            try {
                if (!id) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const product = await ProductModel_1.default.findOne({ where: { id } });
                if (!product) {
                    throw new NotFoundError_1.NotFound();
                }
                await product.destroy();
            }
            catch (err) {
                console.error("Error in deleteProduct:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in deleteProduct: ${JSON.stringify(err)}`);
                }
            }
        };
    }
}
exports.ProductService = ProductService;
