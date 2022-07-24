import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilteradvertPage } from './filteradvert.page';

const routes: Routes = [
  {
    path: '',
    component: FilteradvertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilteradvertPageRoutingModule {}
