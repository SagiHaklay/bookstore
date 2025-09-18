import { Injectable } from '@angular/core';
import { UserAccount } from '../models/user-account.model';
import { Observable, of, throwError } from 'rxjs';
import { UserData } from '../models/user-data.model';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  private _mockUsers: UserAccount[] = [
    { id: '1', username: 'admin', password: 'admin', email: 'admin@gmail.com', isAdmin: true},
    { id: '2', username: 'user', password: 'password', email: 'user@gmail.com', isAdmin: false},
  ];
  constructor(private authService: AuthService, private http: HttpClient) { }

  getUser(id: string): Observable<UserAccount> {
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // const user = users.find((u: any) => u.id === id);
    // if (user) {
    //   return of(user);
    // }
    // return throwError(() => new Error(`User #${id} does not exist.`));
    return this.http.get<UserAccount>(`${environment.apiUrl}/user/${id}`);
  }

  addUser(username: string, password: string, email: string) {
    // const newId = `${this._mockUsers.length + 1}`;
    // const newUser: UserAccount = {
    //   id: newId,
    //   isAdmin: false,
    //   username,
    //   email,
    //   password
    // };
    // this._mockUsers.push(newUser);
    // this.authService.signUp(newUser);
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // users.push(newUser);
    // localStorage.setItem('users', JSON.stringify(users));
    // return of(newUser);
    return this.http.post<UserAccount>(`${environment.apiUrl}/auth/register`, {
      username, email, password
    }, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  updateUser(id: string, data: UserData) {
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // const index = users.findIndex((u: any) => u.id === id);
    // if (index >= 0) {
    //   users[index] = {...users[index], ...data};
    //   localStorage.setItem('users', JSON.stringify(users));
    //   return of(users[index]);
    // }
    // return throwError(() => new Error(`User #${id} does not exist.`));
    return this.http.patch<UserAccount>(`${environment.apiUrl}/user/${id}/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteUser(id: string) {
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // const index = users.findIndex((u: any) => u.id === id);
    // if (index >= 0) {
    //   const [deletedUser] = users.splice(index, 1);
    //   localStorage.setItem('users', JSON.stringify(users));
    //   return of(deletedUser);
    // }
    // return throwError(() => new Error(`User #${id} does not exist.`));
    return this.http.delete(`${environment.apiUrl}/user/${id}/delete`);
  }
}
