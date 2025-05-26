"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
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
                    message: 'Product/service created successfully',
                    product,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
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
                    res.status(500).json({ message: 'Unknown error occurred' });
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
                    res.status(500).json({ message: 'Unknown error occurred' });
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
                    message: 'Product/service updated successfully',
                    product: updatedProduct,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                const { id } = req.params;
                await this.productService.deleteProduct(id);
                res.status(200).json({
                    success: true,
                    message: 'Product/service deleted successfully',
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        };
        this.productService = new ProductService_1.ProductService();
    }
}
exports.ProductController = ProductController;
