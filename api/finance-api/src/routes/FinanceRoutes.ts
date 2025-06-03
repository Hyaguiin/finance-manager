import express, { Router } from 'express';
import {TransactionController} from '../controllers/FinanceController';
import { transactionMiddleware } from '../middleware/FinanceMiddleware';

const router: Router = express.Router();

const transactionController = new TransactionController();

router.post('/', transactionMiddleware, transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);
router.get('/user/:userId', transactionController.getTransactionsByUserId);
router.get('/:id', transactionController.getTransactionById);



export default router;
