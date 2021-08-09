import { NgModule } from '@angular/core';

import { UserCreatePageRoutingModule } from './user-create-routing.module';

import { UserCreatePage } from './user-create.page';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CommonUiForms } from '@papx/common/ui-forms';
import { UsuariosSharedModule } from '../shared/usuarios-shared.module';
import { EmpleadoSelectorModule } from '@papx/shared/ui-clientes/empleado-selector/empleado-selector.module';

@NgModule({
  imports: [
    CommonUiCoreModule,
    CommonUiForms,
    UsuariosSharedModule,
    UserCreatePageRoutingModule,
    EmpleadoSelectorModule,
  ],
  declarations: [UserCreatePage],
})
export class UserCreatePageModule {}
