import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account.model';
import { Observable, of, throwError } from 'rxjs';
import { UserData } from '../models/user-data.model';

@Injectable()
export class UserService {
  private _mockUsers: UserAccount[] = [
    { id: '1', username: 'admin', password: 'admin', email: 'admin@gmail.com', isAdmin: true},
    { id: '2', username: 'user', password: 'password', email: 'user@gmail.com', isAdmin: false},
  ];
  constructor() { }

  getUser(id: string): Observable<UserAccount> {
    const user = this._mockUsers.find((u) => u.id === id);
    if (user) {
      return of(user);
    }
    return throwError(() => new Error(`User #${id} does not exist.`));
  }

  addUser(username: string, password: string, email: string) {
    const newId = `${this._mockUsers.length + 1}`;
    const newUser: UserAccount = {
      id: newId,
      isAdmin: false,
      username,
      email,
      password
    };
    this._mockUsers.push(newUser);
  }

  updateUser(id: string, data: UserData) {
    const index = this._mockUsers.findIndex((u) => u.id === id);
    if (index >= 0) {
      this._mockUsers[index] = {...this._mockUsers[index], ...data};
    }
  }

  deleteUser(id: string) {
    const index = this._mockUsers.findIndex((u) => u.id === id);
    if (index >= 0) {
      this._mockUsers.splice(index, 1);
    }
  }
}
