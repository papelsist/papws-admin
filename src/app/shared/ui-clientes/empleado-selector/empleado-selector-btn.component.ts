import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpleadoSelectorComponent } from './empleado-selector.component';

@Component({
  selector: 'papx-empleado-selector-btn',
  template: `
    <ion-button (click)="buscar()">
      <ion-label>Buscar empleado</ion-label>
      <ion-icon slot="start" name="search"></ion-icon>
    </ion-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoSelectorBtnComponent implements OnInit {
  @Output() selection = new EventEmitter();
  constructor(private controller: ModalController) {}

  ngOnInit() {}

  async buscar() {
    const modal = await this.controller.create({
      component: EmpleadoSelectorComponent,
      componentProps: {},
      mode: 'ios',
      animated: true,
      cssClass: 'empleado-selector-modal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selection.emit(data);
    }
  }
}
