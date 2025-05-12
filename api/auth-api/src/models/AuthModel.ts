import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database/database';
import { UserAttributes, UserCreationAttributes } from '../interfaces/AuthInterface';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  cpf!: string;
  cnpj?: string; 
}

User.init(
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: true, 
      unique: true, 
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
  }
);

export default User;
