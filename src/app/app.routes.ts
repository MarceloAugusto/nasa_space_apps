import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
  },
  {
    path: 'loading',
    loadComponent: () => import('./pages/loading/loading.page').then( m => m.LoadingPage)
  },
  {
    path: 'jogo',
    loadComponent: () => import('./pages/jogo/jogo.page').then( m => m.JogoPage)
  },
  {
    path: 'jogo',
    loadComponent: () => import('./pages/jogo/jogo.page').then( m => m.JogoPage)
  },
  {
    path: 'batalha-seca',
    loadComponent: () => import('./pages/batalha-seca/batalha-seca.page').then( m => m.BatalhaSecaPage)
  },
  {
    path: 'batalha-atmosferica',
    loadComponent: () => import('./pages/batalha-atmosferica/batalha-atmosferica.page').then( m => m.BatalhaAtmosfericaPage)
  },
  {
    path: 'batalha-poluicao',
    loadComponent: () => import('./pages/batalha-poluicao/batalha-poluicao.page').then( m => m.BatalhaPoluicaoPage)
  },
  {
    path: 'batalha-fogo',
    loadComponent: () => import('./pages/batalha-fogo/batalha-fogo.page').then( m => m.BatalhaFogoPage)
  },
  {
    path: 'inicio-fogo',
    loadComponent: () => import('./pages/inicio-fogo/inicio-fogo.page').then( m => m.InicioFogoPage)
  },
];
