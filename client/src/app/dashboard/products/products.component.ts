import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product-services.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports:[CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    this.productService.getProductsByUser(userId).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erro ao carregar produtos', err),
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Deseja realmente excluir este item?')) {
      this.productService.delete(id).subscribe(() => {
        const userId = this.authService.getUserId();
        if (userId) {
          this.productService.getProductsByUser(userId).subscribe(data => this.products = data);
        }
      });
    }
  }
}
