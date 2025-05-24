"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database/database"));
const sequelize_1 = require("sequelize");
class TransactionModel extends sequelize_1.Model {
}
TransactionModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('CREDIT', 'DEBIT'),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    }
}, {
    sequelize: database_1.default,
    tableName: "transactions",
    modelName: "Transaction",
    timestamps: true,
});
exports.default = TransactionModel;
