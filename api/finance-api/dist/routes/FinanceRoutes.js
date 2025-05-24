"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FinanceController_1 = __importDefault(require("../controllers/FinanceController"));
const FinanceMiddleware_1 = require("../middleware/FinanceMiddleware");
const router = express_1.default.Router();
const transactionController = new FinanceController_1.default();
router.post('/transactions', FinanceMiddleware_1.transactionMiddleware, transactionController.createTransaction);
router.get('/transactions', FinanceMiddleware_1.transactionMiddleware, transactionController.getAllTransactions);
router.get('/transactions/:id', FinanceMiddleware_1.transactionMiddleware, transactionController.getTransactionById);
exports.default = router;
