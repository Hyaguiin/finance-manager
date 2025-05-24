import { Request, Response, NextFunction } from 'express';

export const validateTransactionAnalysisData = (req: Request, res: Response, next: NextFunction): void => {
    const { totalAmount, totalCredit, totalDebit, totalByCategory, transactionId } = req.body;

    if (
        totalAmount == null || 
        totalCredit == null || 
        totalDebit == null || 
        totalByCategory == null || 
        transactionId == null
    ) {
         res.status(400).json({
            message: 'Campos obrigatórios ausentes: totalAmount, totalCredit, totalDebit, totalByCategory, transactionId.'
        });
    }

    if (
        typeof totalAmount !== 'number' || 
        typeof totalCredit !== 'number' || 
        typeof totalDebit !== 'number' || 
        typeof totalByCategory !== 'object' || 
        typeof transactionId !== 'string'
    ) {
         res.status(400).json({
            message: 'Os campos têm tipos inválidos.'
        });
    }

    next();
};

