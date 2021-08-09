import { NgModule } from '@angular/core';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CommonUiForms } from '@papx/common/ui-forms';
import { ChangePasswordComponent } from './password/change-password.component';
import { PasswordModalComponent } from './password/password-modal.component';
import { UsuarioCreateFormComponent } from './usuario-create-form/usuario-create-form.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioRolesComponent } from './usuario-roles/usuarios-roles.component';

@NgModule({
  imports: [CommonUiCoreModule, CommonUiForms],
  exports: [
    UsuarioCreateFormComponent,
    UsuarioFormComponent,
    ChangePasswordComponent,
    PasswordModalComponent,
    UsuarioRolesComponent,
  ],
  declarations: [
    UsuarioCreateFormComponent,
    UsuarioFormComponent,
    ChangePasswordComponent,
    PasswordModalComponent,
    UsuarioRolesComponent,
  ],
  providers: [],
})
export class UsuariosSharedModule {}
