import { NgModule } from '@angular/core';

import { UsuariosDetailPageRoutingModule } from './usuarios-detail-routing.module';

import { UsuariosDetailPage } from './usuarios-detail.page';
import { UsuariosSharedModule } from '../shared/usuarios-shared.module';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CommonUiForms } from '@papx/common/ui-forms';

@NgModule({
  imports: [
    CommonUiCoreModule,
    CommonUiForms,
    UsuariosSharedModule,
    UsuariosDetailPageRoutingModule,
  ],
  declarations: [UsuariosDetailPage],
})
export class UsuariosDetailPageModule {}
