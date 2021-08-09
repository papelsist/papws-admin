/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@papx/auth';
import { NotificationsService } from '@papx/data-access';
import { UserInfo } from '@papx/models';

import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'papx-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  token$ = this.service.token$;
  user$ = this.auth.userInfo$;
  vm$ = combineLatest([this.token$, this.user$]).pipe(
    map(([token, user]) => ({ token, user }))
  );

  constructor(
    private service: NotificationsService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  autorizar(user: UserInfo) {}

  cancelar(token: string, user: UserInfo) {}
}
