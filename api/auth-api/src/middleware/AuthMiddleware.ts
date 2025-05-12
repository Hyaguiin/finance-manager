import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';
import { jwt_Secret as SECRET_KEY } from '../utils/baseurl/BaseUrll';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(400).json({ success: false, message: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(403).json({ success: false, message: 'Token inválido' });
            return;
        }

        
        //req.user = decoded;
        next(); 
    });
};
