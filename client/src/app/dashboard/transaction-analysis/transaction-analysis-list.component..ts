import { Component, OnInit } from '@angular/core';
import { TransactionAnalysisService } from '../../services/reports-analysis.service';
import { TransactionAnalyse } from '../../interfaces/financeInterface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transaction-analysis-list',
  templateUrl: './transaction-analysis-list.component.html',
  imports: [CommonModule],
  styleUrls: ['./transaction-analysis-list.component.scss'],
})
export class TransactionAnalysisListComponent implements OnInit {
  analyses: TransactionAnalyse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private analysisService: TransactionAnalysisService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAnalysesByUser();
  }

  loadAnalysesByUser(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const userId = this.authService.getUserId();

    if (!userId) {
      this.errorMessage = 'Usuário não autenticado.';
      this.isLoading = false;
      return;
    }

    this.analysisService.getByUser(userId).subscribe({
      next: (data) => {
        this.analyses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar análises do usuário.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  getCategoryKeys(categories: Record<string, number>): string[] {
    return Object.keys(categories);
  }

  generateAnalysis(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Usuário não autenticado. Não é possível gerar análise.');
      return;
    }

    const sampleAnalysis: Partial<TransactionAnalyse> = {
      transactionId: 'exemplo-transaction-id',
      userId: userId, // Agora seguro, após verificação
      totalAmount: 200.75,
      totalCredit: 150,
      totalDebit: 50.75,
      totalByCategory: {
        food: 100,
        transport: 50.75,
        entertainment: 50,
      },
    };

    this.analysisService.create(sampleAnalysis).subscribe({
      next: () => {
        alert('Análise gerada com sucesso!');
        this.loadAnalysesByUser();
      },
      error: (err) => {
        alert('Erro ao gerar análise');
        console.error(err);
      },
    });
  }
}
