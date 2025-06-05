"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionAnalysisModel_1 = __importDefault(require("../models/TransactionAnalysisModel"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const NotFoundError_1 = require("../utils/NotFoundError");
const Unkown_1 = require("../utils/Unkown");
class TransactionAnalysisService {
    constructor() {
        this.createTransactionAnalysis = async (analysisData) => {
            try {
                if (!analysisData.totalAmount ||
                    !analysisData.totalCredit ||
                    !analysisData.totalDebit ||
                    !analysisData.totalByCategory ||
                    !analysisData.transactionId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                await TransactionAnalysisModel_1.default.create(analysisData);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.getTransactionAnalysesByUserId = async (userId) => {
            try {
                if (!userId) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const analyses = await TransactionAnalysisModel_1.default.findAll({
                    where: { userId },
                });
                if (analyses.length === 0) {
                    throw new NotFoundError_1.NotFound();
                }
                return analyses;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.getAllTransactionAnalyses = async () => {
            try {
                const analyses = await TransactionAnalysisModel_1.default.findAll();
                if (analyses.length === 0) {
                    throw new NotFoundError_1.NotFound();
                }
                return analyses;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.getTransactionAnalysisById = async (id) => {
            try {
                if (!id) {
                    throw new ErrorMissingContent_1.ErrorMissingContent();
                }
                const analysis = await TransactionAnalysisModel_1.default.findOne({
                    where: { id },
                });
                if (!analysis) {
                    throw new NotFoundError_1.NotFound();
                }
                return analysis;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.updateTransactionAnalysis = async (id, updateData) => {
            try {
                const analysis = await TransactionAnalysisModel_1.default.findOne({
                    where: { id },
                });
                if (!analysis) {
                    throw new NotFoundError_1.NotFound();
                }
                await analysis.update(updateData);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.deleteTransactionAnalysis = async (id) => {
            try {
                const analysis = await TransactionAnalysisModel_1.default.findOne({
                    where: { id },
                });
                if (!analysis) {
                    throw new NotFoundError_1.NotFound();
                }
                await analysis.destroy();
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
    }
}
exports.default = TransactionAnalysisService;
