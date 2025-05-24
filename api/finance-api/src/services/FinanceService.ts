import TransactionModel from '../models/FinanceModel';
import { TransactionCreationAttributes } from '../interfaces/TransactionInterface';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';
import { NotFound } from '../utils/NotFoundError';
import { UnknowError } from '../utils/Unkown';

export class TransactionService {  // Exportação nomeada
     createTransaction = async(transactionData: TransactionCreationAttributes) => {
        try {
            const { amount, type, description, category, date, userId } = transactionData;

            if (!amount || !type || !description || !category || !date || !userId) {
                throw new ErrorMissingContent();
            }

            await TransactionModel.create(transactionData);
        } catch (err) {
            console.error("Error in createTransaction: ", err);
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError(`Unexpected error occurred in createTransaction: ${JSON.stringify(err)}`);
            }
        }
    }

     getAllTransactions = async()=> {
        try {
            console.log("Service: Recuperando todas as transações...");
            const transactions = await TransactionModel.findAll();
            console.log("Service: Transações encontradas:", transactions);

            if (transactions.length === 0) {
                throw new NotFound();
            }

            return transactions;
        } catch (err) {
            console.error("Erro no Service:", err);
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

     getTransactionById = async(id: string)=> {
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
            console.error("Error in getTransactionById: ", err);
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError(`Unexpected error occurred in getTransactionById: ${JSON.stringify(err)}`);
            }
        }
    }
}
