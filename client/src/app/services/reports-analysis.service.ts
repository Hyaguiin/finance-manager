import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TransactionAnalyse } from '../interfaces/financeInterface';


@Injectable({
  providedIn: 'root'
})
export class ReportsAnalysisService {

  private apiUrl = `${environment.analysis_reports_apiUrl}/transaction-analysis`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TransactionAnalyse[]> {
    return this.http.get<TransactionAnalyse[]>(this.apiUrl);
  }

  getById(id: string): Observable<TransactionAnalyse> {
    return this.http.get<TransactionAnalyse>(`${this.apiUrl}/${id}`);
  }

  getSummary(analysis: TransactionAnalyse): { creditPercent: number; debitPercent: number } {
    const total = analysis.totalAmount;
    return {
      creditPercent: (analysis.totalCredit / total) * 100,
      debitPercent: (analysis.totalDebit / total) * 100
    };
  }

  create(analysis: Partial<TransactionAnalyse>): Observable<TransactionAnalyse> {
    return this.http.post<TransactionAnalyse>(this.apiUrl, analysis);
  }
}
