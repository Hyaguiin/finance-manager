import TransactionModel from '../models/FinanceModel';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';
import { NotFound } from '../utils/NotFoundError';
import { UnknowError } from '../utils/Unkown';
class TransactionService {
    async createTransaction(transactionData) {
        try {
            const { amount, type, description, category, date, userId } = transactionData;
            if (!amount || !type || !description || !category || !date || !userId) {
                throw new ErrorMissingContent();
            }
            await TransactionModel.create(transactionData);
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new UnknowError();
            }
        }
    }
    async getAllTransactions() {
        try {
            const transactions = await TransactionModel.findAll();
            if (transactions.length === 0) {
                throw new NotFound();
            }
            return transactions;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new UnknowError();
            }
        }
    }
    async getTransactionById(id) {
        try {
            if (!id) {
                throw new ErrorMissingContent();
            }
            const transaction = await TransactionModel.findOne({ where: { id } });
            if (!transaction) {
                throw new NotFound();
            }
            return transaction;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new UnknowError();
            }
        }
    }
}
export default TransactionService;
