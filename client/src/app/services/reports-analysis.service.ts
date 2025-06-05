import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TransactionAnalysis {
  id: string;
  totalAmount: number;
  totalCredit: number;
  totalDebit: number;
  totalByCategory: Record<string, number>;
  generatedAt: string;
  transactionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsAnalysisService {

  private apiUrl = `${environment.analysis_reports_apiUrl}/transaction-analysis`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TransactionAnalysis[]> {
    return this.http.get<TransactionAnalysis[]>(this.apiUrl);
  }

  getById(id: string): Observable<TransactionAnalysis> {
    return this.http.get<TransactionAnalysis>(`${this.apiUrl}/${id}`);
  }

  getSummary(analysis: TransactionAnalysis): { creditPercent: number; debitPercent: number } {
    const total = analysis.totalAmount;
    return {
      creditPercent: (analysis.totalCredit / total) * 100,
      debitPercent: (analysis.totalDebit / total) * 100
    };
  }

  create(analysis: Partial<TransactionAnalysis>): Observable<TransactionAnalysis> {
    return this.http.post<TransactionAnalysis>(this.apiUrl, analysis);
  }
}
