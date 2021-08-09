import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { getRoles, User } from '@papx/models';

import groupBy from 'lodash-es/groupBy';
import pickBy from 'lodash-es/pickBy';

@Component({
  selector: 'papx-usuarios-roles',
  template: `
    <ion-card>
      <ion-card-content>
        <div>
          <ion-list-header color="warning"> Derechos </ion-list-header>
          <ion-list [formGroup]="form">
            <ion-item-group *ngFor="let roleGroup of roles | keyvalue">
              <ion-item-divider sticky="true">
                {{ roleGroup.key }}
              </ion-item-divider>
              <ion-item *ngFor="let role of roleGroup.value">
                <ion-label>
                  <ion-text color="primary"> {{ role.label }} </ion-text>
                  <span class="ion-padding-start">{{ role.descripcion }}</span>
                  <ion-chip color="warning"> {{ role.id }} </ion-chip>
                </ion-label>
                <ion-toggle [formControlName]="role.id"></ion-toggle>
              </ion-item>
            </ion-item-group>
          </ion-list>
          <div class="actions">
            <ion-button
              [disabled]="form.pristine"
              (click)="submit()"
              fill="clear"
              color="primary"
            >
              <ion-label>Actualizar derechos</ion-label>
            </ion-button>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      .actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioRolesComponent implements OnInit {
  @Input() credentials: any;
  @Output() update = new EventEmitter();
  form: FormGroup;
  roles = groupBy(getRoles(), 'app');
  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({});
    getRoles().forEach((item, index) =>
      this.form.addControl(item.id, new FormControl(false))
    );
    // this.form.valueChanges.subscribe((value) => {
    //   const current = value;
    //   const valid = pickBy(value, (item) => item);
    //   console.log('Derechos: ', valid);
    // });

    if (this.credentials) {
      this.form.patchValue(this.credentials);
    }
  }

  submit() {
    const roles = pickBy(this.form.value, (item) => item);
    this.update.emit(roles);
  }
}
