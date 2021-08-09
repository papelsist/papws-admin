import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../@auth';

@Component({
  selector: 'papx-sx-admin-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user$ = this.authService.user$;
  verified$ = this.user$.pipe(map((user) => user.emailVerified));

  data = [];

  constructor(private authService: AuthService) {}
}
