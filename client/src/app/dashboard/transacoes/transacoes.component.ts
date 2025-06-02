import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transacoes',
  imports:[CommonModule],
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {
  
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: (err) => console.error('Erro ao carregar transações', err)
    });
  }
}
