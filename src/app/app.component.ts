import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './@auth';

@Component({
  selector: 'papx-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  imageLocation =
    // eslint-disable-next-line max-len
    'https://firebasestorage.googleapis.com/v0/b/papx-ws-prod.appspot.com/o/images%2Fcirgulo.svg?alt=media&token=860f4435-5ba3-47e4-bc86-f3553538e86b';
  user$ = this.authService.user$;
  projectId = environment.firebaseConfig.projectId;
  constructor(private authService: AuthService, private router: Router) {}

  async signOut() {
    await this.authService.singOut();
    this.router.navigate(['/login']);
  }
}
