import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, cpf, cnpj } = req.body;

    if (!cpf) {
      res.status(400).json({ success: false, message: 'CPF é obrigatório' });
      return;
    }

    try {
      await AuthService.register(name, email, password, cpf, cnpj);
      res.status(201).json({ success: true, message: 'Usuário registrado com sucesso' });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ success: false, message: err.message });
      } else {
        res.status(500).json({ success: false, message: 'Erro desconhecido' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email e senha são obrigatórios' });
        return;
      }

      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ success: true, message: 'Login realizado com sucesso', user, token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ success: false, message: err.message });
      } else {
        res.status(500).json({ success: false, message: 'Erro desconhecido' });
      }
    }
  }

  async validateToken(req: Request, res: Response): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1];

    try {
      if (!token) {
        res.status(400).json({ success: false, message: 'Token não fornecido' });
        return;
      }

      const decoded = await AuthService.validateToken(token);
      res.status(200).json({ success: true, message: 'Token válido', decoded });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ success: false, message: err.message });
      } else {
        res.status(500).json({ success: false, message: 'Erro desconhecido' });
      }
    }
  }
}

export default new AuthController();
