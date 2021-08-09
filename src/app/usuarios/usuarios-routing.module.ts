import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
  },
  {
    path: 'edit/:uid',
    loadChildren: () =>
      import('./usuarios-detail/usuarios-detail.module').then(
        (m) => m.UsuariosDetailPageModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./user-create/user-create.module').then(
        (m) => m.UserCreatePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
