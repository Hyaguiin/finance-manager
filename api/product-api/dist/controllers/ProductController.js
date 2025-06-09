"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
class ProductController {
    constructor() {
        this.createProduct = async (req, res) => {
            try {
                const { name, type, price, description, userId } = req.body;
                const product = await this.productService.createProduct({
                    name,
                    type,
                    price,
                    description,
                    userId,
                });
                res.status(201).json({
                    success: true,
                    message: "Product/service created successfully",
                    product,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.getAllProducts = async (req, res) => {
            try {
                const products = await this.productService.getAllProducts();
                res.status(200).json(products);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.getProductById = async (req, res) => {
            try {
                const { id } = req.params;
                const product = await this.productService.getProductById(id);
                res.status(200).json(product);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.updateProduct = async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const updatedProduct = await this.productService.updateProduct(id, updateData);
                res.status(200).json({
                    success: true,
                    message: "Product/service updated successfully",
                    product: updatedProduct,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.getProductsByUser = async (req, res) => {
            try {
                const { userId } = req.params;
                const products = await this.productService.getProductsByUser(userId);
                res.status(200).json(products);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.getProductTypeByUser = async (req, res) => {
            const { userId } = req.params;
            try {
                if (!userId) {
                    res.status(400).json({
                        sucess: false,
                        message: `Erro: ${ErrorMissingContent_1.ErrorMissingContent}`,
                    });
                    return;
                }
                const product = await this.productService.getAllUserIdProducts(userId, 'PRODUCT');
                res
                    .status(200)
                    .json({
                    sucess: true,
                    message: `Todos os Produtos do ID: ${userId}`,
                    product,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.getServiceTypeByUser = async (req, res) => {
            const { userId } = req.params;
            try {
                if (!userId) {
                    res.status(400).json({
                        sucess: false,
                        message: `Erro: ${ErrorMissingContent_1.ErrorMissingContent}`,
                    });
                    return;
                }
                const service = await this.productService.getAllUserIdProducts(userId, 'SERVICE');
                res
                    .status(200)
                    .json({
                    sucess: true,
                    message: `Todos os Produtos do ID: ${userId}`,
                    service,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                const { id } = req.params;
                await this.productService.deleteProduct(id);
                res.status(200).json({
                    success: true,
                    message: "Product/service deleted successfully",
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: "Unknown error occurred" });
                }
            }
        };
        this.productService = new ProductService_1.ProductService();
    }
}
exports.ProductController = ProductController;
