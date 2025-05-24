import jwt from "jsonwebtoken";
import { jwt_Secret as SECRET_KEY } from "../utils/baseurl/BaseUrll";
export const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Erro: Token não fornecido.",
            });
            return;
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        if (typeof decoded === "string") {
            res.status(401).json({
                success: false,
                message: "Erro: Token inválido.",
            });
            return;
        }
        req.user = {
            userId: decoded["userId"],
            userEmail: decoded["userEmail"],
        };
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Erro ao verificar o token.",
        });
    }
};
