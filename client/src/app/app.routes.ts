import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalisesComponent } from './dashboard/analises/analises.component';
import { TransacoesComponent } from './dashboard/transacoes/transacoes.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { ServicesComponent } from './dashboard/services/services.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'analises', pathMatch: 'full' }, // rota padrão
      { path: 'analises', component: AnalisesComponent },
      { path: 'transacoes', component: TransacoesComponent },
      { path: 'produtos', component: ProductsComponent },
      { path: 'servicos', component: ServicesComponent }
    ]
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
