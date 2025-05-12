import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  cnpj?: string; 
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
