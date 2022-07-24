import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilteradvertPageRoutingModule } from './filteradvert-routing.module';

import { FilteradvertPage } from './filteradvert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilteradvertPageRoutingModule
  ],
  declarations: [FilteradvertPage]
})
export class FilteradvertPageModule {}
