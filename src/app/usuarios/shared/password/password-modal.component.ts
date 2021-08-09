import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { passwordMatch } from '../utils';

@Component({
  selector: 'papx-password-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Cambiar password </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">
            <ion-label>Cerrar</ion-label>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content [formGroup]="form">
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input
              #password
              placeholder="Digite la contraseña"
              formControlName="password"
              [type]="showPassword ? 'text' : 'password'"
            ></ion-input>
            <ion-icon
              slot="start"
              name="key"
              [color]="validColor('confirmPassword')"
            ></ion-icon>
          </ion-item>
          <ion-note *ngIf="passwordError()" color="warning">
            <p class="error-section">{{ passwordError() }}</p>
          </ion-note>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Confirmación</ion-label>
            <ion-input
              placeholder="Contraseña"
              formControlName="confirmPassword"
              [type]="showPassword ? 'text' : 'password'"
            ></ion-input>

            <ion-icon
              slot="start"
              name="checkmark-done"
              [color]="validColor('confirmPassword')"
            ></ion-icon>
            <ion-button
              slot="end"
              shape="round"
              expand="block"
              fill="clear"
              color="dark"
              (click)="showPassword = !showPassword"
              tabindex="-1"
            >
              <ion-icon
                slot="icon-only"
                [name]="showPassword ? 'eye' : 'eye-off'"
              ></ion-icon>
            </ion-button>
          </ion-item>
          <ion-note
            *ngIf="hasError('confirmPassword', 'mustMatch')"
            color="warning"
          >
            <p class="error-section">La contraseña no coincide</p>
          </ion-note>
        </ion-col>
      </ion-row>
      <ion-button
        (click)="submit()"
        expand="block"
        [disabled]="this.form.invalid || this.form.pristine"
      >
        Aceptar
      </ion-button>
    </ion-content>
  `,
})
export class PasswordModalComponent implements OnInit {
  showPassword = false;
  form: FormGroup = new FormGroup(
    {
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$'),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    { validators: [passwordMatch], updateOn: 'change' }
  );
  controls = {
    password: this.form.get('password'),
    confirmPassword: this.form.get('confirmPassword'),
  };
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }

  submit() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.controls.password.value);
    }
  }

  isValid(prop: string) {
    return this.controls[prop].valid;
  }

  hasError(prop: string, code: string) {
    return this.controls[prop].hasError(code);
  }

  validColor(prop: string) {
    return this.isValid(prop) ? 'success' : '';
  }

  passwordError() {
    const ctrl = this.controls.password;
    if (ctrl.pristine) {
      return null;
    }
    if (ctrl.hasError('required')) {
      return 'Digite la contraseña desada';
    } else if (ctrl.hasError('pattern')) {
      return 'Longitud de 8 a 15 caracteres con por lo menos un número';
    } else {
      return null;
    }
  }
}
