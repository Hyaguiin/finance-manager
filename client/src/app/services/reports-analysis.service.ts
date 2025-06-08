import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TransactionAnalyse } from '../interfaces/financeInterface';


@Injectable({
  providedIn: 'root',
})
export class TransactionAnalysisService {
  private apiURL = environment.analysis_reports_apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TransactionAnalyse[]> {
    return this.http.get<TransactionAnalyse[]>(`${this.apiURL}/transaction-analyse`);
  }

  getByUser(userId: string): Observable<TransactionAnalyse[]> {
    return this.http.get<TransactionAnalyse[]>(`${this.apiURL}/transaction-analyse/user/${userId}`);
  }

  create(analysis: Partial<TransactionAnalyse>): Observable<TransactionAnalyse> {
    return this.http.post<TransactionAnalyse>(`${this.apiURL}/transaction-analyse`, analysis);
  }

  update(id: string, analysis: Partial<TransactionAnalyse>): Observable<TransactionAnalyse> {
    return this.http.put<TransactionAnalyse>(`${this.apiURL}/transaction-analyse/${id}`, analysis);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/transaction-analyse/${id}`);
  }
}
