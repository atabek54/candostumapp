import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaymodalPageRoutingModule } from './detaymodal-routing.module';

import { DetaymodalPage } from './detaymodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaymodalPageRoutingModule
  ],
  declarations: [DetaymodalPage]
})
export class DetaymodalPageModule {}
