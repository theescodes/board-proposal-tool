import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'proposals',
    loadComponent: () => import('./pages/proposal-list/proposal-list').then(m => m.ProposalListComponent)
  },
  {
    path: 'proposals/new',
    loadComponent: () => import('./pages/proposal-create/proposal-create').then(m => m.ProposalCreateComponent)
  },
  {
    path: 'proposals/:id',
    loadComponent: () => import('./pages/proposal-detail/proposal-detail').then(m => m.ProposalDetailComponent)
  },
  {
    path: 'proposals/:id/edit',
    loadComponent: () => import('./pages/proposal-edit/proposal-edit').then(m => m.ProposalEditComponent)
  }
];
