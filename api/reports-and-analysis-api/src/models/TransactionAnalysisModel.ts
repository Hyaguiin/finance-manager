import sequelize from "../config/database/database";
import { DataTypes, Model } from "sequelize";
import { TransactionAnalysisAttributes, TransactionAnalysisCreationAttributes } from "../interfaces/TransactionAnalysisInterface";

class TransactionAnalysisModel extends Model<TransactionAnalysisAttributes, TransactionAnalysisCreationAttributes> implements TransactionAnalysisAttributes {
    id!: string;
    totalAmount!: number;
    totalCredit!: number;
    totalDebit!: number;
    totalByCategory!: Record<string, number>; // Ex: { 'food': 100, 'transport': 50 }
    generatedAt!: Date;
    transactionId!: string; 
}

TransactionAnalysisModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalCredit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalDebit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalByCategory: {
        type: DataTypes.JSONB,  
        allowNull: false,
    },
    generatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    transactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'transactions', 
            key: 'id',
        }
    }
}, {
    sequelize,
    tableName: "transaction_analyses", 
    modelName: "TransactionAnalysis",  
    timestamps: true,
});

export default TransactionAnalysisModel;
