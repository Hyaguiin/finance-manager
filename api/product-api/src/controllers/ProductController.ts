import express, { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req: Request, res: Response): Promise<void> => {
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
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();

      res.status(200).json(products);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const product = await this.productService.getProductById(id);

      res.status(200).json(product);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedProduct = await this.productService.updateProduct(
        id,
        updateData
      );

      res.status(200).json({
        success: true,
        message: "Product/service updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };

  getProductsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;

      const products = await this.productService.getProductsByUser(userId);

      res.status(200).json(products);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };



 getProductsByUserAndType = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { type } = req.query; 

  try {
    const products = await this.productService.getProductsByUserAndType(
      userId,
      type as 'PRODUCT' | 'SERVICE'
    );

    res.status(200).json({
      success: true,
      message: `Produtos do usuário ${userId}${type ? ` do tipo ${type}` : ''}`,
      products,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: `Error: ${err.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};




  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      await this.productService.deleteProduct(id);

      res.status(200).json({
        success: true,
        message: "Product/service deleted successfully",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: `Error: ${err.message}` });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  };
}
