import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TransactionAnalysisService } from '../../services/reports-analysis.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/financeInterface';

@Component({
  selector: 'app-transaction-analysis-create',
  templateUrl: './transaction-analysis-create.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./transaction-analysis-create.component.scss']
})
export class TransactionAnalysisCreateComponent implements OnInit {
  analysisForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  transactions: Transaction[] = [];

  constructor(
    private fb: FormBuilder,
    private analysisService: TransactionAnalysisService,
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.analysisForm = this.fb.group({
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      totalCredit: ['', [Validators.required, Validators.min(0)]],
      totalDebit: ['', [Validators.required, Validators.min(0)]],
      categories: this.fb.array([]),
      generatedAt: ['', Validators.required],
      transactionId: ['', Validators.required],
      userId: ['', Validators.required],
    });

    this.setUserId();
    this.addCategory();
    this.loadTransactions();
  }

  setUserId(): void {
    const userId = this.authService.getUserId();
    this.analysisForm.patchValue({ userId });
    this.analysisForm.get('userId')?.disable();
  }

  isUserIdDisabled(): boolean {
    return this.analysisForm.get('userId')?.disabled ?? false;
  }

  get categories(): FormArray {
    return this.analysisForm.get('categories') as FormArray;
  }

  addCategory(): void {
    const categoryGroup = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
    this.categories.push(categoryGroup);
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  loadTransactions(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.transactionService.getTransactionsByUser(userId).subscribe({
      next: (trans) => {
        this.transactions = trans;
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.analysisForm.invalid) {
      this.analysisForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.analysisForm.getRawValue();

    const totalByCategory = formValue.categories.reduce((acc: any, cat: any) => {
      acc[cat.name] = parseFloat(cat.amount);
      return acc;
    }, {});

    const newAnalysis = {
      totalAmount: +formValue.totalAmount,
      totalCredit: +formValue.totalCredit,
      totalDebit: +formValue.totalDebit,
      totalByCategory,
      generatedAt: new Date(formValue.generatedAt).toISOString(),
      transactionId: formValue.transactionId,
      userId: formValue.userId,
    };

    this.analysisService.create(newAnalysis).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/transacoes_analise']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao criar análise. Tente novamente.';
        console.error('Erro:', error);
      },
    });
  }
}
