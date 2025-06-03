"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const FinanceModel_1 = __importDefault(require("../models/FinanceModel"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const NotFoundError_1 = require("../utils/NotFoundError");
const Unkown_1 = require("../utils/Unkown");
class TransactionService {
    constructor() {
        this.createTransaction = async (transactionData) => {
            try {
                const { amount, type, description, category, date, userId } = transactionData;
                if (!amount || !type || !description || !category || !date || !userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                await FinanceModel_1.default.create(transactionData);
            }
            catch (err) {
                console.error("Error in createTransaction: ", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error occurred in createTransaction: ${JSON.stringify(err)}`);
                }
            }
        };
        this.getAllTransactions = async () => {
            try {
                console.log("Service: Recuperando todas as transações...");
                const transactions = await FinanceModel_1.default.findAll();
                console.log("Service: Transações encontradas:", transactions);
                if (transactions.length === 0) {
                    throw new NotFoundError_1.NotFound();
                }
                return transactions;
            }
            catch (err) {
                console.error("Erro no Service:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.getTransactionById = async (id) => {
            try {
                if (!id) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const transaction = await FinanceModel_1.default.findOne({ where: { id } });
                if (!transaction) {
                    throw new NotFoundError_1.NotFound();
                }
                return transaction;
            }
            catch (err) {
                console.error("Error in getTransactionById: ", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error occurred in getTransactionById: ${JSON.stringify(err)}`);
                }
            }
        };
        this.getTransactionsByUserId = async (userId) => {
            try {
                if (!userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const transactions = await FinanceModel_1.default.findAll({ where: { userId } });
                return transactions;
            }
            catch (err) {
                console.error("Error in getTransactionsByUserId:", err);
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError(`Unexpected error in getTransactionsByUserId: ${JSON.stringify(err)}`);
                }
            }
        };
    }
}
exports.TransactionService = TransactionService;
