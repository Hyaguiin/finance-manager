import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalisesComponent } from './dashboard/analises/analises.component';
import { TransacoesComponent } from './dashboard/transacoes/transacoes.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { ProductsCreateComponent } from './dashboard/products-service-create/products-services-create.component';
import { ServicesComponent } from './dashboard/services-component/services.component';
import { TransacoesCreateComponent } from './dashboard/transacoes-create/transacoes-create.component';

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
      { path: '', redirectTo: 'analises', pathMatch: 'full' },
      { path: 'analises', component: AnalisesComponent },
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
