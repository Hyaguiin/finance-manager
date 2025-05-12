import sequelize from "../config/database/database";
import { DataTypes, Model } from "sequelize";
import { TransactionAttributes, TransactionCreationAttributes } from "../interfaces/TransactionInterface";

class TransactionModel extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    id!: string;
    amount!: number;
    type!: 'CREDIT' | 'DEBIT';
    description!: string;
    category!: string;
    date!: Date;
    userId!: string;
}

TransactionModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('CREDIT', 'DEBIT'),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        }
    }
}, {
    sequelize,
    tableName: "transactions",
    modelName: "Transaction",
    timestamps: true,
});

export default TransactionModel;
