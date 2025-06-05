import sequelize from "../config/database/database";
import { DataTypes, Model } from "sequelize";
import {
  TransactionAnalysisAttributes,
  TransactionAnalysisCreationAttributes,
} from "../interfaces/TransactionAnalysisInterface";

class TransactionAnalysisModel
  extends Model<
    TransactionAnalysisAttributes,
    TransactionAnalysisCreationAttributes
  >
  implements TransactionAnalysisAttributes
{
  id!: string;
  totalAmount!: number;
  totalCredit!: number;
  totalDebit!: number;
  totalByCategory!: Record<string, number>; // Ex: { 'food': 100, 'transport': 50 }
  generatedAt!: Date;
  transactionId!: string;
  userId!: string;
}

TransactionAnalysisModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "totalamount",
    },
    totalCredit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "totalcredit",
    },
    totalDebit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "totaldebit",
    },
    totalByCategory: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "totalbycategory",
    },
    generatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "generatedat",
    },
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "transactions",
        key: "id",
      },
      field: "transactionid",
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "transaction_analyses",
    modelName: "TransactionAnalysis",
    timestamps: false, // Desabilita a criação de createdAt e updatedAt
  }
);

export default TransactionAnalysisModel;
