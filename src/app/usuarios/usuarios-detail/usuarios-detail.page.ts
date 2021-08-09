import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { finalize, switchMap } from 'rxjs/operators';

import { User } from '@papx/models';
import { LoadingService } from '@papx/common/ui-core';
import { UsuariosFacade } from '../usuarios.facade';
import { AuthService } from '@papx/auth';

@Component({
  selector: 'papx-usuarios-detail',
  templateUrl: './usuarios-detail.page.html',
  styleUrls: ['./usuarios-detail.page.scss'],
})
export class UsuariosDetailPage implements OnInit {
  user$ = this.route.paramMap.pipe(
    switchMap((params) => this.facade.getCurrentUser(params.get('uid')))
  );

  credentials$ = this.user$.pipe(
    switchMap((user) => this.facade.getCredentials(user.uid))
  );

  adminUser$ = this.auth.user$;

  constructor(
    private route: ActivatedRoute,
    private facade: UsuariosFacade,
    private auth: AuthService,
    private loading: LoadingService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onSave(user: User, changes: Partial<User>, adminUser: User) {
    await this.loading.startLoading('Actualizando usuario...');
    try {
      await this.facade.updateUser(user, changes, adminUser);
      // await this.loading.stopLoading();
      this.facade
        .updateUserProfile(user.uid, changes)
        .pipe(finalize(async () => await this.loading.stopLoading()))
        .subscribe(
          () => {},
          (error) => this.showMessage(error.message, 'Error salvando cambios')
        );
    } catch (error) {
      this.showMessage(error.message, 'Error salvando cambios');
      await this.loading.stopLoading();
    }
  }

  async onUpdateRoles(user: User, roles: any) {
    await this.loading.startLoading('Actualizando roles');
    this.facade
      .updateUserRoles(user.uid, roles)
      .pipe(finalize(() => this.loading.stopLoading()))
      .subscribe(
        (res) => this.showMessage('Derechos actualizados'),
        (err) => console.error('Error actualizando roles: ', err)
      );
  }

  async onUpdatePassword(user: User, roles: any) {
    await this.loading.startLoading('Actualizando password');
    this.facade
      .updateUserPassword(user.uid, roles)
      .pipe(finalize(() => this.loading.stopLoading()))
      .subscribe(
        (res) => this.showMessage('Contraseña actualizada satisfactoriamente'),
        (err) => console.error('Error actualizando roles: ', err)
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
