import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IlanlarimPage } from './ilanlarim.page';

const routes: Routes = [
  {
    path: '',
    component: IlanlarimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IlanlarimPageRoutingModule {}
