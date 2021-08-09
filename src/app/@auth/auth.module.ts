import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { throwIfAlreadyLoaded } from '../utils/angular';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
    throwIfAlreadyLoaded(parentModule, 'AuthModule');
  }
}
