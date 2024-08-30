import { AsyncPipe, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '@app/core/models';
import { UsersService } from '@app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe],
})
export class UsersTableComponent implements OnInit {
  @Output() selectedUser = new EventEmitter<User>();
  private usersService = inject(UsersService);
  public users$: Observable<User[]> = this.usersService.users;

  ngOnInit() {
    this.usersService.getUsers().subscribe();
  }

  public selectUser(user: User) {
    this.selectedUser.emit(user);
  }

  public trackByFn(index: number, user: User) {
    return user.uuid;
  }
}
