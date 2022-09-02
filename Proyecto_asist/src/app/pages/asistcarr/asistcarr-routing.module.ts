import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistcarrPage } from './asistcarr.page';

const routes: Routes = [
  {
    path: '',
    component: AsistcarrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistcarrPageRoutingModule {}
