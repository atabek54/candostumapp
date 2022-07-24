import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetaymodalPage } from './detaymodal.page';

const routes: Routes = [
  {
    path: '',
    component: DetaymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetaymodalPageRoutingModule {}
