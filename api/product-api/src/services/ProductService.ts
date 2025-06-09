import ProductModel from "../models/ProductModel";
import { ProductCreationAttributes } from "../interfaces/ProductInterface"; // supondo que exista
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { NotFound } from "../utils/NotFoundError";
import { UnknowError } from "../utils/Unkown";
import { EmptyArrayError } from "../utils/EmptyArrayError";

export class ProductService {
  createProduct = async (productData: ProductCreationAttributes) => {
    try {
      const { type, price, description, userId } = productData;

      if (!type || !price || !description || !userId) {
        throw new ErrorMissingContent();
      }

      await ProductModel.create(productData);
    } catch (err) {
      console.error("Error in createProduct:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError(
          `Unexpected error in createProduct: ${JSON.stringify(err)}`
        );
      }
    }
  };

  getAllProducts = async () => {
    try {
      const products = await ProductModel.findAll();

      if (products.length === 0) {
        throw new NotFound();
      }

      return products;
    } catch (err) {
      console.error("Error in getAllProducts:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError();
      }
    }
  };

  getProductById = async (id: string) => {
    try {
      if (!id) {
        throw new ErrorMissingContent();
      }

      const product = await ProductModel.findOne({ where: { id } });

      if (!product) {
        throw new NotFound();
      }

      return product;
    } catch (err) {
      console.error("Error in getProductById:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError(
          `Unexpected error in getProductById: ${JSON.stringify(err)}`
        );
      }
    }
  };

  getProductsByUser = async (userId: string) => {
    try {
      if (!userId) {
        throw new ErrorMissingContent("User ID is required");
      }

      const products = await ProductModel.findAll({ where: { userId } });

      if (products.length === 0) {
        throw new NotFound("Nenhum produto encontrado para esse usuário");
      }

      return products;
    } catch (err) {
      console.error("Error in getProductsByUser:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError(
          `Unexpected error in getProductsByUser: ${JSON.stringify(err)}`
        );
      }
    }
  };

  getAllUserIdService = async (userId: string, SERVICE: string) => {
    try {
      if (!userId) {
        throw new ErrorMissingContent("User ID is required");
      }
      if ((await this.getAllProducts()).length === 0) {
        throw new EmptyArrayError();
      }
      const service = await ProductModel.findAll({
        where:  {userId: userId, type: SERVICE},
      });
      if (!service) {
        throw new Error(`SERVICE NOT FOUND!`);
      }
      console.log(`Todos os serviços: ${service}`);
      return service;
    } catch (err) {
      if (err instanceof Error) {
      }
    }
  };

  getAllUserIdProducts = async (userId: string, PRODUCT: string) => {
    try {
      if ((await this.getAllProducts()).length === 0) {
        throw new EmptyArrayError();
      }
      const service = await ProductModel.findAll({
        where: { userId: userId, type: PRODUCT },
      });
      if (!service) {
        throw new Error(`SERVICE NOT FOUND!`);
      }
      console.log(`Todos os serviços: ${service}`);
      return service;
    } catch (err) {
      if (err instanceof Error) {
      }
    }
  };

  updateProduct = async (
    id: string,
    updateData: Partial<ProductCreationAttributes>
  ) => {
    try {
      if (!id) {
        throw new ErrorMissingContent();
      }

      const product = await ProductModel.findOne({ where: { id } });

      if (!product) {
        throw new NotFound();
      }

      await product.update(updateData);

      return product;
    } catch (err) {
      console.error("Error in updateProduct:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError(
          `Unexpected error in updateProduct: ${JSON.stringify(err)}`
        );
      }
    }
  };

  deleteProduct = async (id: string) => {
    try {
      if (!id) {
        throw new ErrorMissingContent();
      }

      const product = await ProductModel.findOne({ where: { id } });

      if (!product) {
        throw new NotFound();
      }

      await product.destroy();
    } catch (err) {
      console.error("Error in deleteProduct:", err);
      if (err instanceof Error) {
        throw err;
      } else {
        throw new UnknowError(
          `Unexpected error in deleteProduct: ${JSON.stringify(err)}`
        );
      }
    }
  };
}
