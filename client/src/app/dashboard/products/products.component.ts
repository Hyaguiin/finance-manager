import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-services.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/productInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('[DEBUG] userId recebido no ProductsComponent:', userId);

    if (!userId) {
      console.error('[ERROR] Usuário não autenticado no ProductsComponent');
      return;
    }

    this.loadProducts(userId);
  }

  loadProducts(userId: string) {
    console.log('[DEBUG] Chamando loadProducts para userId:', userId);
    this.productService.getByType('PRODUCT', userId).subscribe({
      next: (data) => {
        console.log('[DEBUG] Produtos extraídos:', data.products);
        this.products = data.products;
      },

      error: (err) => console.error('[ERROR] Falha ao carregar produtos:', err),
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Deseja realmente excluir este item?')) {
      this.productService.delete(id).subscribe(() => {
        const userId = this.authService.getUserId();
        if (userId) {
          this.loadProducts(userId);
        }
      });
    }
  }
}
