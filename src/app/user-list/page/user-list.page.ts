import { Component } from '@angular/core';
import { User } from '@app/core/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage {
  public user!: User | undefined;
  public showModal: boolean = false;

  selectUser(user: User) {
    this.showModal = true;
    this.user = user;
  }

  createUser() {
    this.showModal = true;
    this.user = new User();
  }

  public onWillDismiss() {
    this.user = undefined;
  }
}
