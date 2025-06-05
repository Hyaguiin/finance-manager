import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // import HttpHeaders
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // importe AuthService
import { Product } from '../interfaces/productInterface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.productApiUrl}/api/product`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getLoggedUser(); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Product[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  getById(id: string): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  create(product: Product): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    const headers = this.getAuthHeaders();
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers });
  }

  getProductsByUser(userId: string): Observable<Product[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  getByType(type: 'PRODUCT' | 'SERVICE', userId: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/user/${userId}?type=${type}`);
}

  delete(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
