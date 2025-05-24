import express, { Router } from "express";
import TransactionAnalysisController from "../controllers/TransactionAnalysisController";
import { validateTransactionAnalysisData } from "../middleware/TransactionAnalysisMiddleware";

const router: Router = express.Router();
const transactionAnalysisController = new TransactionAnalysisController();

router.post(
  "/",
  validateTransactionAnalysisData,
  transactionAnalysisController.create
);

router.get("/", transactionAnalysisController.getAll);
router.get("/:id", transactionAnalysisController.getById);
router.put("/:id", transactionAnalysisController.update);
router.delete("/:id", transactionAnalysisController.delete);

export default router;
