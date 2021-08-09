import { NgModule } from '@angular/core';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CommonUiForms } from '@papx/common/ui-forms';
import { EmpleadoSelectorBtnComponent } from './empleado-selector-btn.component';
import { EmpleadoSelectorComponent } from './empleado-selector.component';

@NgModule({
  imports: [CommonUiCoreModule, CommonUiForms],
  exports: [EmpleadoSelectorBtnComponent, EmpleadoSelectorComponent],
  declarations: [EmpleadoSelectorBtnComponent, EmpleadoSelectorComponent],
  providers: [],
})
export class EmpleadoSelectorModule {}
