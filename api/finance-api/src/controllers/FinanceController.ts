import express, { Request, Response } from 'express';
import { TransactionService } from '../services/FinanceService';  // Importando o service com export nomeado

export class TransactionController {
    private transactionService: TransactionService;  

    constructor() {
        this.transactionService = new TransactionService();
    }

     createTransaction = async(req: Request, res: Response): Promise<void> => {
        try {
            const { amount, type, description, category, date, userId } = req.body;

            const transaction = await this.transactionService.createTransaction({
                amount,
                type,
                description,
                category,
                date,
                userId,
            });

            // Retorna sucesso
            res.status(201).json({
                success: true,
                message: 'Transaction created successfully',
                transaction,
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }

     getAllTransactions = async(req: Request, res: Response): Promise<void> => {
        try {
            console.log('Controller: Chamando getAllTransactions'); 
            const transactions = await this.transactionService.getAllTransactions(); 

            console.log('Controller: Transações recuperadas', transactions); 

            res.status(200).json(transactions);
        } catch (err) {
            console.error('Erro no Controller:', err); 
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }

     getTransactionById = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;  
            const transaction = await this.transactionService.getTransactionById(id); 

            res.status(200).json(transaction);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: `Error: ${err.message}` });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }
}


