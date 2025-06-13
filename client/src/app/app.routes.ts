import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component'; 
import { TransactionAnalysisListComponent } from './dashboard/transaction-analysis/transaction-analysis-list.component';
import { TransactionAnalysisCreateComponent } from './dashboard/transaction-analysis-create/transaction-analysis-create.component';
import { TransacoesComponent } from './dashboard/transacoes/transacoes.component';
import { TransacoesCreateComponent } from './dashboard/transacoes-create/transacoes-create.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { ProductsCreateComponent } from './dashboard/products-service-create/products-services-create.component';
import { ServicesComponent } from './dashboard/services-component/services.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent }, 
      { path: 'transacoes_analise', component: TransactionAnalysisListComponent },
      { path: 'transacoes_analise/create', component: TransactionAnalysisCreateComponent },
      { path: 'transacoes', component: TransacoesComponent },
      { path: 'transacoes/create', component: TransacoesCreateComponent },
      { path: 'produtos', component: ProductsComponent },
      { path: 'produtos/create', component: ProductsCreateComponent },
      { path: 'servicos', component: ServicesComponent },
    ],
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];
