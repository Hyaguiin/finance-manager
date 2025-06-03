import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.authApiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(data: LoginData): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/login`, data, {
        withCredentials: true,
      })
      .pipe(
  tap((response) => {
    if (response?.message) {
      const jsonPart = response.message.replace('Authenticated: ', '');
      try {
        const user = JSON.parse(jsonPart);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.error('Erro ao parsear usuário do login:', e);
      }
    }
  })
)

  }

  
  getLoggedUser(): RegisterData | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

 getUserId(): string | null {
  const user = this.getLoggedUser();
  if (user && user.id) {
    return user.id;
  }
  return null;
}

}
