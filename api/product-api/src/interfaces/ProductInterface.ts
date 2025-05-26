import { Optional } from "sequelize";

export interface ProductAttributes {
  id: string;
  name: string;               
  type: 'PRODUCT' | 'SERVICE';
  price: number;
  description: string;
  userId: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}
