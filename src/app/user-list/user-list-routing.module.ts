import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListPage } from './page/user-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListPageRoutingModule {}
