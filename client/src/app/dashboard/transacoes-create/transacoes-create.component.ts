import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/financeInterface';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transacoes-create',
  templateUrl: './transacoes-create.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./transacoes-create.component.scss']
})
export class TransacoesCreateComponent implements OnInit {

    isLoading = false;
  error = '';
  transactions: Transaction[] = []; 
  transacaoForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}

ngOnInit(): void {
  const userId = this.authService.getUserId();
  console.log('User ID no ngOnInit:', userId);

  this.transacaoForm = this.fb.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    type: ['credit', Validators.required],
    category: ['', Validators.required],
    date: [new Date().toISOString().slice(0, 16), Validators.required]
  });
}

  onSubmit() {
    if (this.transacaoForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.transacaoForm.value;

  const userId = this.authService.getUserId();

if (!userId) {
  this.errorMessage = 'Usuário não autenticado';
  this.isSubmitting = false;
  return;
}

const newTransaction = {
  description: formValue.description,
  amount: +formValue.amount,
  type: formValue.type.toUpperCase(),
  category: formValue.category,
  date: new Date(formValue.date).toISOString(),
  userId
};


    this.transactionService.createTransaction(newTransaction).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/transacoes']); 
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao criar transação. Tente novamente.';
        console.error(err);
      }
    });
  }

}
