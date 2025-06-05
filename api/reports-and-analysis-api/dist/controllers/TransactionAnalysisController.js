"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionAnalysisService_1 = __importDefault(require("../services/TransactionAnalysisService"));
class TransactionAnalysisController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const analysisData = req.body;
                await this.analysisService.createTransactionAnalysis(analysisData);
                res
                    .status(201)
                    .send({ message: "Análise de transação criada com sucesso!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.getAll = async (req, res) => {
            try {
                const analyses = await this.analysisService.getAllTransactionAnalyses();
                res.status(200).json(analyses);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.getByUserId = async (req, res) => {
            try {
                const { userId } = req.params;
                const analyses = await this.analysisService.getTransactionAnalysesByUserId(userId);
                res.status(200).json(analyses);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.getById = async (req, res) => {
            try {
                const { id } = req.params;
                const analysis = await this.analysisService.getTransactionAnalysisById(id);
                res.status(200).json(analysis);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const updateData = req.body;
                await this.analysisService.updateTransactionAnalysis(id, updateData);
                res
                    .status(200)
                    .send({ message: "Análise de transação atualizada com sucesso!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.analysisService.deleteTransactionAnalysis(id);
                res
                    .status(200)
                    .send({ message: "Análise de transação deletada com sucesso!" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send({ message: err.message });
                }
            }
        };
        this.analysisService = new TransactionAnalysisService_1.default();
    }
}
exports.default = TransactionAnalysisController;
