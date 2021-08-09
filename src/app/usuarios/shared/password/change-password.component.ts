import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordModalComponent } from './password-modal.component';

@Component({
  selector: 'papx-change-password',
  template: `
    <ion-button (click)="changePassword()">
      <ion-label> Cambiar password </ion-label>
      <ion-icon name="key" slot="start"></ion-icon>
    </ion-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  @Output() changeValue = new EventEmitter<string>();
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async changePassword() {
    const modal = await this.modalController.create({
      component: PasswordModalComponent,
      cssClass: 'change-password-modal',
      mode: 'ios',
      animated: true,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.changeValue.emit(data);
    }
  }
}
