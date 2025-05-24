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
router.post("/", TransactionAnalysisMiddleware_1.validateTransactionAnalysisData, transactionAnalysisController.create);
router.get("/", transactionAnalysisController.getAll);
router.get("/:id", transactionAnalysisController.getById);
router.put("/:id", transactionAnalysisController.update);
router.delete("/:id", transactionAnalysisController.delete);
exports.default = router;
