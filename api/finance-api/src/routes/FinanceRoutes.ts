import express, { Router } from 'express';
import { TransactionController } from '../controllers/FinanceController';
import { transactionMiddleware } from '../middleware/FinanceMiddleware';

const router: Router = express.Router();
const transactionController = new TransactionController();

router.post('/', transactionMiddleware, transactionController.createTransaction);

router.get('/user/:userId', transactionController.getTransactionsByUserId);

router.get('/', transactionController.getAllTransactions);

export default router;
