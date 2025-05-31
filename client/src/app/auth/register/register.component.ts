import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, RegisterData } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      second_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cnpj: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    const registerData: RegisterData = {
      name: `${formValue.name} ${formValue.second_name}`,
      email: formValue.email,
      cpf: formValue.cpf,
      cnpj: formValue.cnpj || undefined,
      password: formValue.password,
      second_name: formValue.second_name,
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log('Cadastro bem-sucedido', res);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
      },
    });
  }
}
