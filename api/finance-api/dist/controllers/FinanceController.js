"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const FinanceService_1 = require("../services/FinanceService"); // Importando o service com export nomeado
class TransactionController {
    constructor() {
        this.createTransaction = async (req, res) => {
            try {
                const { amount, type, description, category, date, userId } = req.body;
                const transaction = await this.transactionService.createTransaction({
                    amount,
                    type,
                    description,
                    category,
                    date,
                    userId,
                });
                // Retorna sucesso
                res.status(201).json({
                    success: true,
                    message: 'Transaction created successfully',
                    transaction,
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
        };
        this.getAllTransactions = async (req, res) => {
            try {
                console.log('Controller: Chamando getAllTransactions');
                const transactions = await this.transactionService.getAllTransactions();
                console.log('Controller: Transações recuperadas', transactions);
                res.status(200).json(transactions);
            }
            catch (err) {
                console.error('Erro no Controller:', err);
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: 'Unknown error occurred' });
                }
            }
        };
        this.getTransactionById = async (req, res) => {
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
        };
        this.getTransactionsByUserId = async (req, res) => {
            try {
                const { userId } = req.query; // Pega userId da query string
                if (!userId || typeof userId !== 'string') {
                    res.status(400).json({ message: 'userId is required as query param' });
                    return;
                }
                const transactions = await this.transactionService.getTransactionsByUserId(userId);
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
        };
        this.transactionService = new FinanceService_1.TransactionService();
    }
}
exports.TransactionController = TransactionController;
