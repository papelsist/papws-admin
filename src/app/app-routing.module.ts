import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  hasCustomClaim,
  emailVerified,
} from '@angular/fire/auth-guard';

import {
  redirectLoggedInToHome,
  redirectUnverifiedToPending,
  redirectVeifiedToHome,
  redirectUnauthorized,
} from '@papx/auth';

const isAdminUser = () => hasCustomClaim('xpapAdmin');

const routes2: Routes = [
  {
    path: '',
    ...canActivate(redirectUnauthorized),
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then(
            (m) => m.UsuariosPageModule
          ),
        ...canActivate(isAdminUser),
      },
      {
        path: 'catalogos',
        loadChildren: () =>
          import('./features/catalogos/catalogos.module').then(
            (m) => m.CatalogosPageModule
          ),
      },
      {
        path: 'operaciones',
        loadChildren: () =>
          import('./features/operaciones/operaciones.module').then(
            (m) => m.OperacionesPageModule
          ),
      },
      {
        path: 'preferencias',
        loadChildren: () =>
          import('./features/preferencias/preferencias.module').then(
            (m) => m.PreferenciasPageModule
          ),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./features/analytics/analytics.module').then(
            (m) => m.AnalyticsPageModule
          ),
      },
      {
        path: 'aplicaciones',
        loadChildren: () =>
          import('./features/aplicaciones/aplicaciones.module').then(
            (m) => m.AplicacionesPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./@auth/login/login.module').then((m) => m.LoginPageModule),
    // ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes2, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
