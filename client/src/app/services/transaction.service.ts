import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  category: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiURL = environment.financeApiUrl;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiURL}/transaction`);
  }
getTransactionsByUser(userId: string): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(`${this.apiURL}/transaction/user/${userId}`);
}



  createTransaction(
    transaction: Partial<Transaction>
  ): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${this.apiURL}/transaction`,
      transaction
    );
  }

  updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.apiURL}/transaction/${id}`,
      transaction
    );
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/transaction/${id}`);
  }
}
