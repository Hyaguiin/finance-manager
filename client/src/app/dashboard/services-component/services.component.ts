import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-services.service';
import { AuthService } from '../../services/auth.service';
import { Product, ProductResponse } from '../../interfaces/productInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Product[] = [];

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

    this.loadServices(userId);
  }

  loadServices(userId: string) {
    this.productService.getByType('SERVICE', userId).subscribe({
      next: (data: ProductResponse) => {
        console.log('[DEBUG] Serviços carregados:', data.products);
        this.services = data.products;
      },
      error: (err) => console.error('Erro ao carregar serviços', err),
    });
  }

  deleteService(id: string): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.productService.delete(id).subscribe(() => {
        const userId = this.authService.getUserId();
        if (userId) {
          this.loadServices(userId);
        }
      });
    }
  }
}
