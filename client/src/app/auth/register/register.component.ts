// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ],
  templateUrl: './register.component.html', // <-- templateUrl obrigatório
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      second_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      cnpj: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registro válido:', this.registerForm.value);
      // this.router.navigate(['/login']); // Redirecionar após cadastro
    } else {
      console.log('Formulário inválido', this.registerForm.errors);
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}