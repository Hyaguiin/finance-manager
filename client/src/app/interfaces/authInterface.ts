export interface RegisterData {
  id?: string;
  name: string;
  second_name: string;
  email: string;
  cpf: string;
  cnpj?: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}