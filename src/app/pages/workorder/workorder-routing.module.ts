import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderPage } from './workorder.page';

const routes: Routes = [
  {
    path: '',
    component: WorkorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkorderPageRoutingModule {}
