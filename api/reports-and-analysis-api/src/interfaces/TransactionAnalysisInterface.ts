import { Optional } from "sequelize";

export interface TransactionAnalysisAttributes {
    id: string;
    totalAmount: number;
    totalCredit: number;
    totalDebit: number;
    totalByCategory: Record<string, number>; // Ex: { 'food': 100, 'transport': 50 }
    generatedAt: Date;
    transactionId: string; 
    userId: string
}

export interface TransactionAnalysisCreationAttributes extends Optional<TransactionAnalysisAttributes, 'id' | 'generatedAt'> {}
