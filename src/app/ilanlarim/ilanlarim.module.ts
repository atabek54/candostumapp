import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IlanlarimPageRoutingModule } from './ilanlarim-routing.module';

import { IlanlarimPage } from './ilanlarim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IlanlarimPageRoutingModule
  ],
  declarations: [IlanlarimPage]
})
export class IlanlarimPageModule {}
