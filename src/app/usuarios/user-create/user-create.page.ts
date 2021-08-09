/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

import { CatalogosService } from '@papx/data-access';
import { Empleado, User } from '@papx/models';
import { UsuariosFacade } from '../usuarios.facade';

import { BehaviorSubject, Subject } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';

import capitalize from 'lodash-es/capitalize';
import { AuthService } from '@papx/auth';
import { LoadingService } from '@papx/common/ui-core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'papx-user-create',
  templateUrl: './user-create.page.html',
  styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage implements OnInit {
  user$ = this.auth.user$;
  private empleado = new Subject<Empleado>();
  readonly empleado$ = this.empleado.asObservable().pipe(
    map((empleado) => {
      const {
        nombres,
        nombre,
        numeroDeEmpleado,
        puesto,
        sucursal,
        apellidoPaterno,
      } = empleado;
      let displayName = `${nombres.split(' ')[0]} ${apellidoPaterno}`;
      displayName = displayName
        .split(' ')
        .map((item) => capitalize(item))
        .join(' ');

      return {
        displayName,
        nombre: nombre
          .split(' ')
          .map((item) => capitalize(item))
          .join(' '),
        numeroDeEmpleado,
        puesto,
        sucursal,
      };
    })
  );
  constructor(
    private auth: AuthService,
    private loading: LoadingService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  onEmpleasoSelection(event: any) {
    this.empleado.next(event);
  }

  async onSave(user: Partial<User>, createUser: User) {
    const payload = { ...user, createUser: createUser.displayName };
    await this.loading.startLoading('Creando usuario...');
    this.auth
      .createUser(payload)
      .pipe(finalize(async () => await this.loading.stopLoading()))
      .subscribe(
        async (res) => {
          await this.showMessage('Usuario registrado exitosamente');
          this.router.navigate(['usuarios', 'edit', res.uid]);
        },
        async (err) => {
          this.showMessage(err.message, 'Error generando usuario');
          await this.loading.stopLoading();
        }
      );
  }

  async showMessage(
    message: string,
    header: string = 'Administración de usuario',
    subHeader?: string
  ) {
    const alert = await this.alertController.create({
      message,
      header,
      subHeader,
      mode: 'ios',
      animated: true,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
