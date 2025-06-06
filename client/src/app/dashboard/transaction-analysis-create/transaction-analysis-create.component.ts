import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionAnalysisService } from '../../services/reports-analysis.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-analysis-create',
  templateUrl: './transaction-analysis-create.component.html',
  imports:[CommonModule,ReactiveFormsModule],
  styleUrls: ['./transaction-analysis-create.component.scss']
})
export class TransactionAnalysisCreateComponent implements OnInit {
  analysisForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private analysisService: TransactionAnalysisService,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.analysisForm = this.fb.group({
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      totalCredit: ['', [Validators.required, Validators.min(0)]],
      totalDebit: ['', [Validators.required, Validators.min(0)]],
      totalByCategory: ['', [Validators.required, this.validateJson]],
      generatedAt: ['', Validators.required],
      transactionId: ['', Validators.required],
      userId: ['', Validators.required],  
    });

    this.setUserId();
  }

  setUserId(): void {
  const userId = this.authService.getUserId();  
  this.analysisForm.patchValue({ userId });  

  this.analysisForm.get('userId')?.disable(); 
}
  isUserIdDisabled(): boolean {
    return this.analysisForm.get('userId')?.disabled ?? false;  
  }
  validateJson(control: any): { [key: string]: boolean } | null {
    try {
      const parsed = JSON.parse(control.value);
      return parsed && typeof parsed === 'object' ? null : { invalidJson: true };
    } catch {
      return { invalidJson: true };
    }
  }

  onSubmit(): void {
    if (this.analysisForm.invalid) {
      this.analysisForm.markAllAsTouched();  // Marca todos os campos como tocados para exibir erros
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';  // Limpa qualquer mensagem de erro anterior

    let formValue = this.analysisForm.value;

    let totalByCategoryParsed;
    try {
      totalByCategoryParsed = JSON.parse(formValue.totalByCategory);
    } catch {
      this.errorMessage = 'Formato inválido para Total por Categoria.'; 
      this.isSubmitting = false;
      return;
    }

    const newAnalysis = {
      totalAmount: +formValue.totalAmount,
      totalCredit: +formValue.totalCredit,
      totalDebit: +formValue.totalDebit,
      totalByCategory: totalByCategoryParsed,
      generatedAt: new Date().toISOString(),
      transactionId: formValue.transactionId,
      userId: formValue.userId,  
    };

    this.analysisService.create(newAnalysis).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/transaction-analyses']);  
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao criar análise. Tente novamente.';  
        console.error('Erro:', error);
      },
    });
  }
}