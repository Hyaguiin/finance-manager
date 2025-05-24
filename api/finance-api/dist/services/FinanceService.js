"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FinanceModel_1 = __importDefault(require("../models/FinanceModel"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const NotFoundError_1 = require("../utils/NotFoundError");
const Unkown_1 = require("../utils/Unkown");
class TransactionService {
    async createTransaction(transactionData) {
        try {
            const { amount, type, description, category, date, userId } = transactionData;
            if (!amount || !type || !description || !category || !date || !userId) {
                throw new ErrorMissingContent_1.ErrorMissingContent();
            }
            await FinanceModel_1.default.create(transactionData);
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    }
    async getAllTransactions() {
        try {
            const transactions = await FinanceModel_1.default.findAll();
            if (transactions.length === 0) {
                throw new NotFoundError_1.NotFound();
            }
            return transactions;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    }
    async getTransactionById(id) {
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
            if (err instanceof Error) {
                throw err;
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    }
}
exports.default = TransactionService;
