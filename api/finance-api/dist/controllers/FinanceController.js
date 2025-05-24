"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FinanceService_1 = __importDefault(require("../services/FinanceService"));
class TransactionController {
    constructor() {
        this.transactionService = new FinanceService_1.default();
    }
    async createTransaction(req, res) {
        try {
            const { amount, type, description, category, date, userId } = req.body;
            await this.transactionService.createTransaction({ amount, type, description, category, date, userId });
            res.status(201).json({
                success: true,
                message: 'Transaction created successfully'
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            }
            else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
    async getAllTransactions(req, res) {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            res.status(200).json(transactions);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            }
            else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
    async getTransactionById(req, res) {
        try {
            const { id } = req.params;
            const transaction = await this.transactionService.getTransactionById(id);
            res.status(200).json(transaction);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            }
            else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
}
exports.default = TransactionController;
