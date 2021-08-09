import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperacionesPage } from './operaciones.page';

const routes: Routes = [
  {
    path: '',
    component: OperacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperacionesPageRoutingModule {}
