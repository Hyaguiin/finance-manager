import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginData } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const loginData: LoginData = this.loginForm.value;

 this.authService.login(loginData).subscribe({
  next: (response) => {
    console.log('Login response:', response);
    const user = this.authService.getLoggedUser();
    console.log('Usuário salvo:', user);
    if (user && user.id) {
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Usuário não salvo corretamente no localStorage');
    }
  },
  error: (err) => {
    console.error('Login error', err);
  }
});


  }
}
