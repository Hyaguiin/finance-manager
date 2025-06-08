import { Component, OnInit } from '@angular/core';
import { TransactionAnalysisService } from '../../services/reports-analysis.service';
import { TransactionAnalyse } from '../../interfaces/financeInterface';
import { CommonModule } from '@angular/common';
//rx
@Component({
  selector: 'app-transaction-analysis-list',
  templateUrl: './transaction-analysis-list.component.html',
  imports:[CommonModule],
  styleUrls: ['./transaction-analysis-list.component.scss'],
})
export class TransactionAnalysisListComponent implements OnInit {
  analyses: TransactionAnalyse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private analysisService: TransactionAnalysisService) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.analysisService.getAll().subscribe({
      next: (data) => {
        this.analyses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar análises.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  getCategoryKeys(categories: Record<string, number>): string[] {
    return Object.keys(categories);
  }

  // Exemplo de função para criar análise automaticamente, pode ser chamada a partir de botão
  generateAnalysis(): void {
    const sampleAnalysis: Partial<TransactionAnalyse> = {
      transactionId: 'exemplo-transaction-id',
      userId: 'exemplo-user-id',
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
        this.loadAnalyses(); // Recarrega a lista após criar
      },
      error: (err) => {
        alert('Erro ao gerar análise');
        console.error(err);
      },
    });
  }
}
