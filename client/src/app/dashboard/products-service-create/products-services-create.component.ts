import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-services-create.component.html',
  styleUrls: ['./products-services-create.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProductsCreateComponent implements OnInit {
  productForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['PRODUCT', Validators.required], // default 'PRODUCT', pode ser 'SERVICE'
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'Usuário não autenticado.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.productForm.value;

    const newProduct: Product = {
      name: formValue.name,
      type: formValue.type,
      price: +formValue.price,
      description: formValue.description,
      userId,
    };

    this.productService.create(newProduct).subscribe({
      next: () => {
        this.isSubmitting = false;
        console.log('Produto criado com sucesso, navegando para products');
        this.router.navigate(['/dashboard/produtos']); 
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Erro ao criar produto/serviço. Tente novamente.';
        console.error('Erro na criação:', error);
      },
    });
  }
}
