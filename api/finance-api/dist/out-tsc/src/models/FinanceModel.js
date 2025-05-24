import sequelize from "../config/database/database";
import { DataTypes, Model } from "sequelize";
class TransactionModel extends Model {
    id;
    amount;
    type;
    description;
    category;
    date;
    userId;
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
