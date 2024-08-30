import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class UsersTableComponent implements OnInit {
  @Output() selectedUser = new EventEmitter<User>();
  private usersService = inject(UsersService);
  public users$ = this.usersService.users;

  ngOnInit() {
    this.usersService.getUsers().subscribe();
  }

  selectUser(user: User) {
    this.selectedUser.emit(user);
  }
}
