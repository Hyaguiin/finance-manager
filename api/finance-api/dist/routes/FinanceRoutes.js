"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FinanceController_1 = require("../controllers/FinanceController");
const FinanceMiddleware_1 = require("../middleware/FinanceMiddleware");
const router = express_1.default.Router();
const transactionController = new FinanceController_1.TransactionController();
router.post('/', FinanceMiddleware_1.transactionMiddleware, transactionController.createTransaction);
router.get('/user/:userId', transactionController.getTransactionsByUserId);
router.get('/', transactionController.getAllTransactions);
exports.default = router;
