import sequelize from "../config/database/database";
import { DataTypes, Model } from "sequelize";
class TransactionAnalysisModel extends Model {
    id;
    totalAmount;
    totalCredit;
    totalDebit;
    totalByCategory; // Ex: { 'food': 100, 'transport': 50 }
    generatedAt;
    transactionId;
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
