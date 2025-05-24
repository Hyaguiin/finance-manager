import express, { Router } from 'express';
import TransactionAnalysisController from '../controllers/TransactionAnalysisController';
import {validateTransactionAnalysisData} from '../middleware/TransactionAnalysisMiddleware';

const router: Router = express.Router();
const transactionAnalysisController = new TransactionAnalysisController();

router.post('/transaction-analyses', validateTransactionAnalysisData, transactionAnalysisController.create);

router.get('/transaction-analyses', transactionAnalysisController.getAll); 
router.get('/transaction-analyses/:id', transactionAnalysisController.getById); 
router.put('/transaction-analyses/:id', transactionAnalysisController.update);
router.delete('/transaction-analyses/:id', transactionAnalysisController.delete); 

export default router;
