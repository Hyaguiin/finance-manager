"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionAnalysisController_1 = __importDefault(require("../controllers/TransactionAnalysisController"));
const TransactionAnalysisMiddleware_1 = require("../middleware/TransactionAnalysisMiddleware");
const router = express_1.default.Router();
const transactionAnalysisController = new TransactionAnalysisController_1.default();
router.post('/transaction-analyses', TransactionAnalysisMiddleware_1.validateTransactionAnalysisData, transactionAnalysisController.create);
router.get('/transaction-analyses', transactionAnalysisController.getAll);
router.get('/transaction-analyses/:id', transactionAnalysisController.getById);
router.put('/transaction-analyses/:id', transactionAnalysisController.update);
router.delete('/transaction-analyses/:id', transactionAnalysisController.delete);
exports.default = router;
