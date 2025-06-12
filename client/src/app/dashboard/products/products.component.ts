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
  this.productService.getByType('PRODUCT', userId).subscribe({
    next: (data: any) => {
      console.log('[DEBUG] Resposta da API para produtos:', data);
      if (Array.isArray(data)) {
        this.products = data;
      } else if (data.product) {
        this.products = data.product;
      } else if (data.products) {
        this.products = data.products;
      } else {
        this.products = [];
        console.warn('[WARN] Nenhuma lista de produtos encontrada na resposta');
      }
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
