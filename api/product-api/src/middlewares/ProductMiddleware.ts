import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/ProductModel";

export const authorizeProductOwner = async(
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void>=> {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findByPk(productId);

    if (!product) {
       res
        .status(404)
        .json({ message: "Produto/serviço não encontrado" });
    }

    next();
  } catch (error) {
     res.status(500).json({ message: "Erro interno no servidor" });
  }
}
