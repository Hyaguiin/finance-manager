import TransactionModel from '../models/FinanceModel';
import { TransactionCreationAttributes } from '../interfaces/TransactionInterface';
import { ErrorMissingContent } from '../../../auth-api/src/utils/ErrorMissingContent';
import { NotFound } from '../../../auth-api/src/utils/NotFoundError';
import { UnknowError } from '../../../auth-api/src/utils/Unkown';

class TransactionService {
  
    async createTransaction(transactionData: TransactionCreationAttributes): Promise<void> {
        try {
            const { amount, type, description, category, date, userId } = transactionData;

            if (!amount || !type || !description || !category || !date || !userId) {
                throw new ErrorMissingContent();
            }

            await TransactionModel.create(transactionData);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

    async getAllTransactions(): Promise<any[]> {
        try {
            const transactions = await TransactionModel.findAll();
            if (transactions.length === 0) {
                throw new NotFound();
            }
            return transactions;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

    async getTransactionById(id: string): Promise<any> {
        try {
            if (!id) {
                throw new ErrorMissingContent();
            }

            const transaction = await TransactionModel.findOne({ where: { id } });
            if (!transaction) {
                throw new NotFound();
            }

            return transaction;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }
}

export default TransactionService;
