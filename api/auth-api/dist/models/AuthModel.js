"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database/database"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cnpj: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
});
exports.default = User;
