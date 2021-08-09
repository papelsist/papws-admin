import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicacionesPageRoutingModule } from './aplicaciones-routing.module';

import { AplicacionesPage } from './aplicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AplicacionesPageRoutingModule
  ],
  declarations: [AplicacionesPage]
})
export class AplicacionesPageModule {}
