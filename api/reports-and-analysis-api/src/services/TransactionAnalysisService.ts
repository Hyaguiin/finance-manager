import TransactionAnalysisModel from '../models/TransactionAnalysisModel';
import { TransactionAnalysisCreationAttributes } from '../interfaces/TransactionAnalysisInterface';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';
import { NotFound} from '../utils/NotFoundError'
import { UnknowError} from '../utils/Unkown'

class TransactionAnalysisService {
  
     createTransactionAnalysis = async(analysisData: TransactionAnalysisCreationAttributes)=> {
        try {
            if (!analysisData.totalAmount || !analysisData.totalCredit || !analysisData.totalDebit || 
                !analysisData.totalByCategory || !analysisData.transactionId) {
                throw new ErrorMissingContent();
            }

            await TransactionAnalysisModel.create(analysisData);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

     getAllTransactionAnalyses = async()=> {
        try {
            const analyses = await TransactionAnalysisModel.findAll();
            if (analyses.length === 0) {
                throw new NotFound();
            }
            return analyses;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

     getTransactionAnalysisById= async(id: string)=> {
        try {
            if (!id) {
                throw new ErrorMissingContent();
            }

            const analysis = await TransactionAnalysisModel.findOne({ where: { id } });
            if (!analysis) {
                throw new NotFound();
            }

            return analysis;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

     updateTransactionAnalysis  = async(id: string, updateData: TransactionAnalysisCreationAttributes)=> {
        try {
            const analysis = await TransactionAnalysisModel.findOne({ where: { id } });
            if (!analysis) {
                throw new NotFound();
            }

            await analysis.update(updateData);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }

     deleteTransactionAnalysis = async(id: string) => {
        try {
            const analysis = await TransactionAnalysisModel.findOne({ where: { id } });
            if (!analysis) {
                throw new NotFound();
            }

            await analysis.destroy();
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new UnknowError();
            }
        }
    }
}

export default TransactionAnalysisService;
