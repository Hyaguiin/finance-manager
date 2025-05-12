import { Request, Response, NextFunction } from 'express';
import { ErrorMissingContent } from '../../../auth-api/src/utils/ErrorMissingContent';
export const transactionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { amount, type, description, category, date, userId } = req.body;

    if (!amount || !type || !description || !category || !date || !userId) {
        throw new ErrorMissingContent(); 
    }

    next(); 
};
