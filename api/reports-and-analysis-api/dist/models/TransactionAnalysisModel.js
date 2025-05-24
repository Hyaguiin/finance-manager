"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database/database"));
const sequelize_1 = require("sequelize");
class TransactionAnalysisModel extends sequelize_1.Model {
}
TransactionAnalysisModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'totalamount'
    },
    totalCredit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'totalcredit'
    },
    totalDebit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        field: 'totaldebit'
    },
    totalByCategory: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
        field: 'totalbycategory'
    },
    generatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: 'generatedat'
    },
    transactionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'transactions',
            key: 'id',
        },
        field: 'transactionid'
    }
}, {
    sequelize: database_1.default,
    tableName: "transaction_analyses",
    modelName: "TransactionAnalysis",
    timestamps: false, // Desabilita a criação de createdAt e updatedAt
});
exports.default = TransactionAnalysisModel;
