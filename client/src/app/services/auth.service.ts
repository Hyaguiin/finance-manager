import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterData {
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }
}
