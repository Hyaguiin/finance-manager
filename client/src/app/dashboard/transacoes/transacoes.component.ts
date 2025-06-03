import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transacoes',
  imports: [CommonModule],
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    this.transactionService.getTransactionsByUser(userId).subscribe({
      next: (data) => this.transactions = data,
      error: (err) => console.error('Erro ao carregar transações', err),
    });
  }
}
