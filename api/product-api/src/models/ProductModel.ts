import sequelize from "../config/Database";
import { DataTypes, Model } from "sequelize";
import { ProductAttributes, ProductCreationAttributes } from "../interfaces/ProductInterface";

class ProductModel extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  id!: string;
  name!: string;
  type!: 'PRODUCT' | 'SERVICE';
  price!: number;
  description!: string;
  userId!: string;
}

ProductModel.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('PRODUCT', 'SERVICE'),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',  // mapeia para user_id no DB
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: "products",
  modelName: "Product",
  timestamps: true,
  underscored: true,  // para created_at, updated_at etc
});

export default ProductModel;
