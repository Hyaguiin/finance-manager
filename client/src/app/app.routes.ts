import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalisesComponent } from './dashboard/analises/analises.component';
import { TransacoesComponent } from './dashboard/transacoes/transacoes.component';

export const routes: Routes = [
  // Agrupamento das rotas de autenticação
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Rotas protegidas do dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'analises', pathMatch: 'full' }, // rota padrão
      { path: 'analises', component: AnalisesComponent },
      { path: 'transacoes', component: TransacoesComponent },
      // futuras rotas filhas vão aqui
    ]
  },

  // Redirecionamento base
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Wildcard para páginas não encontradas
  { path: '**', redirectTo: 'auth/login' }
];
