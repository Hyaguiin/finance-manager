import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';
import { ProductService } from '../../services/product-services.service';
import { Transaction } from '../../interfaces/financeInterface';
import { Product } from '../../interfaces/productInterface';
import {
  Chart,
  ArcElement,
  PieController,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';

// Registra todos os elementos necessários
Chart.register(
  ArcElement,
  PieController,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarElement
);


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  products: Product[] = [];

  totalTransactionAmount = 0;
  totalProductsCount = 0;

  isLoading = true;
  errorMessage = '';

  // Gráfico de pizza (distribuição por categoria)
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#000000',
          '#555555',
          '#999999',
          '#222222',
          '#444444',
        ],
      },
    ],
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#000' },
      },
    },
  };

  // Gráfico de linha (transações ao longo do tempo)
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Valor das Transações',
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#000' } },
    },
    scales: {
      x: { ticks: { color: '#000' } },
      y: { ticks: { color: '#000' } },
    },
  };

  // Gráfico de barras (produtos por categoria)
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Produtos por Categoria',
        data: [],
        backgroundColor: '#28a745',
      },
    ],
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#000' } },
    },
    scales: {
      x: { ticks: { color: '#000' } },
      y: { ticks: { color: '#000' } },
    },
  };

  constructor(
    private transactionService: TransactionService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.transactionService.getTransactions().subscribe({
      next: (trans) => {
        this.transactions = trans;
        this.totalTransactionAmount = trans.reduce(
          (acc, t) => acc + (t.amount || 0),
          0
        );

        // Gráfico de pizza (por categoria)
        const categoryTotals: Record<string, number> = {};
        const transactionsByDate: Record<string, number> = {};
        trans.forEach((t) => {
          // Pizza
          if (t.category) {
            categoryTotals[t.category] =
              (categoryTotals[t.category] || 0) + (t.amount || 0);
          }

          // Linha
          const date = new Date(t.date).toLocaleDateString();
          transactionsByDate[date] =
            (transactionsByDate[date] || 0) + (t.amount || 0);
        });

        this.pieChartData.labels = Object.keys(categoryTotals);
        this.pieChartData.datasets[0].data = Object.values(categoryTotals);

        this.lineChartData.labels = Object.keys(transactionsByDate);
        this.lineChartData.datasets[0].data = Object.values(transactionsByDate);

        // Carrega produtos
        this.productService.getAll().subscribe({
          next: (prod) => {
            this.products = prod;
            this.totalProductsCount = prod.length;

            // Gráfico de barras (produtos por categoria)
            // Gráfico de barras (produtos por tipo)
            const productTypeCount: Record<string, number> = {
              PRODUCT: 0,
              SERVICE: 0,
            };
            prod.forEach((p) => {
              productTypeCount[p.type] = (productTypeCount[p.type] || 0) + 1;
            });
            this.barChartData.labels = ['PRODUCT', 'SERVICE'];
            this.barChartData.datasets[0].data = [
              productTypeCount['PRODUCT'],
              productTypeCount['SERVICE'],
            ];

            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'Erro ao carregar produtos.';
            console.error(err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar transações.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
