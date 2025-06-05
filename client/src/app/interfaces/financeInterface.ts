export interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  category: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionAnalyse {
  id: string;
  totalAmount: number;
  totalCredit: number;
  totalDebit: number;
  totalByCategory: Record<string, number>;
  generatedAt: string;
  transactionId: string;
}