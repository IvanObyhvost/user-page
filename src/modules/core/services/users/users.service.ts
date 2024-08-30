import { inject, Injectable } from '@angular/core';
import { User } from '@app/core/models';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { UsersApiService } from '../api/users-api.service';
import { ToasterService } from '../toaster/toaster.service';
import { TOASTER_TYPES } from '@app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersApiService = inject(UsersApiService);
  public toasterService = inject(ToasterService);
  private users$ = new BehaviorSubject<User[]>([]);

  public get users() {
    return this.users$.asObservable();
  }

  public getUsers() {
    return this.usersApiService.getUsers().pipe(
      tap((users) => {
        this.users$.next(users);
      })
    );
  }

  public getUser(uuid: string): User | undefined {
    const users = this.users$.getValue();
    return users.find((user) => user.uuid === uuid);
  }

  public add(user: User) {
    return this.usersApiService.addUser(user).pipe(
      tap(() => this.users$.next([...this.users$.getValue(), user])),
      catchError((error) => {
        if (error?.error === 'unique') {
          this.toasterService.showToaster(
            TOASTER_TYPES.Error,
            'Username must be unique'
          );
        }
        return throwError(() => error);
      })
    );
  }

  public update(user: User) {
    return this.usersApiService.updateUser(user).pipe(
      tap(() => {
        const users = this.users$.getValue();
        const index = users.findIndex((item) => item.uuid === user.uuid);
        users[index] = new User(user);
        this.users$.next([...users]);
      }),
      catchError((error) => {
        if (error?.error === 'unique') {
          this.toasterService.showToaster(
            TOASTER_TYPES.Error,
            'Username must be unique'
          );
        }
        return throwError(() => error);
      })
    );
  }

  public delete(uuid: string) {
    return this.usersApiService.deleteUser(uuid).pipe(
      tap(() => {
        const users = this.users$
          .getValue()
          .filter((user) => user.uuid !== uuid);
        this.users$.next(users);
      })
    );
  }
}
