import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPage } from './page/user-list.page';
import { UserListPageRoutingModule } from './user-list-routing.module';
import { UsersTableComponent } from '@app/shared/components';
import { EditUserModalComponent } from 'src/modules/modals';

@NgModule({
  imports: [
    CommonModule,
    UserListPageRoutingModule,
    UsersTableComponent,
    EditUserModalComponent,
  ],
  declarations: [UserListPage],
})
export class UserListPageModule {}
