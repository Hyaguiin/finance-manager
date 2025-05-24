import express from 'express';
import TransactionController from '../controllers/FinanceController';
import { transactionMiddleware } from '../middleware/FinanceMiddleware';
const router = express.Router();
const transactionController = new TransactionController();
router.post('/transactions', transactionMiddleware, transactionController.createTransaction);
router.get('/transactions', transactionMiddleware, transactionController.getAllTransactions);
router.get('/transactions/:id', transactionMiddleware, transactionController.getTransactionById);
export default router;
