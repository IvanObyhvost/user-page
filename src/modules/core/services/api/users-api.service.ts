import { inject, Injectable } from '@angular/core';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { STORAGE_KEYS } from '@app/shared/constants';
import { User } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private localSorageService = inject(LocalstorageService);
  private users: User[] = [];
  constructor() {
    this.init();
  }

  private init() {
    const data = this.localSorageService.getObject(STORAGE_KEYS.Users);
    if (Array.isArray(data)) {
      this.users = data;
    }
  }

  getUsers(): Observable<User[]> {
    return of(this.users.map((user) => new User(user)));
  }

  addUser(user: User): Observable<User> {
    const hasDuplicate = this.hasDuplicate(user);
    if (hasDuplicate) {
      return throwError(() => ({
        error: 'unique',
      }));
    }
    const newUser = new User(user);
    this.users.push(newUser);
    this.localSorageService.setObject(STORAGE_KEYS.Users, this.users);
    return of(newUser);
  }

  updateUser(user: User): Observable<User> {
    const hasDuplicate = this.hasDuplicate(user);
    if (hasDuplicate) {
      return throwError(() => ({
        error: 'unique',
      }));
    }
    const newUser = new User(user);
    const index = this.users.findIndex((item) => item.uuid === user.uuid);
    this.users[index] = newUser;
    this.localSorageService.setObject(STORAGE_KEYS.Users, this.users);
    return of(newUser);
  }

  deleteUser(uuid: string): Observable<void> {
    this.users = this.users.filter((item) => item.uuid !== uuid);
    this.localSorageService.setObject(STORAGE_KEYS.Users, this.users);
    return of(undefined);
  }

  private hasDuplicate(user: User): boolean {
    //bug
    return this.users
      .filter((item) => item.uuid !== user.uuid)
      .some((item) => item.username === user.username);
  }
}
