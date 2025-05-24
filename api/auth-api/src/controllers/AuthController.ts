import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { UnknowError } from "../utils/Unkown";
import { jwt_Secret, jwt_expires } from "../utils/baseurl/BaseUrll";
import jwt from "jsonwebtoken";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import User from "../models/AuthModel";
import bcrypt from "bcryptjs";
import { NotFound } from "../utils/NotFoundError";
import { JwtError } from "../utils/JwtError";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, cpf, cnpj } = req.body;

    try {
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: `Campos obrigatórios ausentes: name, email, password`,
        });
        return;
      }

      const registeredUser = await this.authService.registerService({
        name,
        email,
        password,
        cpf,
        cnpj,
      });

      const token = jwt.sign(
        {
          userId: registeredUser.id,
          userEmail: registeredUser.email,
        },
        jwt_Secret,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        success: true,
        message: "Usuário registrado com sucesso!",
        data: {
          user: {
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
          },
          token,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({
          success: false,
          message: `Erro interno: ${err.message}`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Erro desconhecido: ${new UnknowError().message}`,
        });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res
          .status(500)
          .json({ sucess: false, message: `Error: ${ErrorMissingContent}` });
        return;
      }
      const login = await User.findOne({ where: { email: email } });
      if (!login) {
        res
          .status(400)
          .json({ sucess: false, message: `Failed to find: ${NotFound}` });
        return;
      }
      const isPasswordCorret = bcrypt.compare(password, login.password);
      if (!isPasswordCorret) {
        res
          .status(400)
          .json({ sucess: false, message: `the Password is not Match!` });
        return;
      }
      const token = jwt.sign(
        { userId: login.id, userEmail: login.email },
        jwt_Secret,
        { expiresIn: "1h" }
      );
      if (!token) {
        res.status(400).json({ sucess: false, message: `error: ${JwtError}` });
        return;
      }
      res.status(200).json({
        sucess: true,
        message: `Authenticated: ${JSON.stringify(login?.dataValues)}`,
        token,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({
          success: false,
          message: `Erro interno: ${err.message}`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Erro desconhecido: ${new UnknowError().message}`,
        });
      }
    }
  };

  validateToken = async (req: Request, res: Response): Promise<void> => {
    const { token = req.headers.authorization?.split(" ")[1] } = req.body;
    try {
      if (!token) {
        res
          .status(500)
          .json({ sucess: false, message: `Error: ${ErrorMissingContent}` });
        return;
      }
      const decode = jwt.verify(token, jwt_Secret);
      if (!decode) {
        res.status(400).json({ sucess: false, message: `${JwtError}` });
        return;
      }
      res
        .status(200)
        .json({ sucess: true, message: `Sucess! is a valid token!`, decode });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({
          success: false,
          message: `Erro interno: ${err.message}`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Erro desconhecido: ${new UnknowError().message}`,
        });
      }
    }
  };
}
