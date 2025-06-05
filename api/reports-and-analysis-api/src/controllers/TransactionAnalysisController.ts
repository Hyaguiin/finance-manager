import { Request, Response } from "express";
import TransactionAnalysisService from "../services/TransactionAnalysisService";

class TransactionAnalysisController {
  private analysisService: TransactionAnalysisService;

  constructor() {
    this.analysisService = new TransactionAnalysisService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const analysisData = req.body;
      await this.analysisService.createTransactionAnalysis(analysisData);
      res
        .status(201)
        .send({ message: "Análise de transação criada com sucesso!" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const analyses = await this.analysisService.getAllTransactionAnalyses();
      res.status(200).json(analyses);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };

  getByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const analyses =
        await this.analysisService.getTransactionAnalysesByUserId(userId);
      res.status(200).json(analyses);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const analysis = await this.analysisService.getTransactionAnalysisById(
        id
      );
      res.status(200).json(analysis);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      await this.analysisService.updateTransactionAnalysis(id, updateData);
      res
        .status(200)
        .send({ message: "Análise de transação atualizada com sucesso!" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.analysisService.deleteTransactionAnalysis(id);
      res
        .status(200)
        .send({ message: "Análise de transação deletada com sucesso!" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ message: err.message });
      }
    }
  };
}

export default TransactionAnalysisController;
