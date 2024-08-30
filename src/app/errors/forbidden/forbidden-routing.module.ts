import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenPage } from './page/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: ForbiddenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForbiddenPageRoutingModule {}
