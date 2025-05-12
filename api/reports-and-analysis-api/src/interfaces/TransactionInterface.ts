import { Optional } from "sequelize";

export interface TransactionAttributes {
    id: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    description: string;
    category: string;
    date: Date;
    userId: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}
