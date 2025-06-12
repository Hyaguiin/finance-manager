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
    private serviceService: ProductService,
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
  this.serviceService.getByType('SERVICE', userId).subscribe({
    next: (data: any) => {
      console.log('[DEBUG] Resposta da API para serviços:', data);

      // Verifique se a resposta tem a propriedade 'service' (singular)
      if (Array.isArray(data)) {
        this.services = data;
      } else if (data.service) {
        this.services = data.service;
      } else if (data.services) {
        this.services = data.services;
      } else {
        this.services = [];
        console.warn('[WARN] Nenhuma lista de serviços encontrada na resposta');
      }
    },
    error: (err) => console.error('[ERROR] Falha ao carregar serviços:', err),
  });
}

  deleteService(id: string): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.serviceService.delete(id).subscribe(() => {
        const userId = this.authService.getUserId();
        if (userId) {
          this.loadServices(userId);
        }
      });
    }
  }
}
