import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService {
  private _token = new BehaviorSubject<string | null>(null);
  token = this._token.asObservable();
  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = this._isAdmin.asObservable();
  private _mockUsers = [
    { username: 'admin', password: 'admin', isAdmin: true, token: 'admintoken' },
    { username: 'user', password: 'password', isAdmin: false, token: 'token' }
  ];
  constructor() { }

  login(username: string, password: string) {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {
      this._token.next(storedToken);
      // const storedIsAdmin = localStorage.getItem('isAdmin');
      // this._isAdmin.next(storedIsAdmin === 'true');
      return of({
        token: storedToken,
        isSuccess: true
      });
    }
    const user = this._mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      this._token.next(user.token);
      this._isAdmin.next(user.isAdmin);
      return of({
        token: user.token,
        isSuccess: true
      });
    }
    // REST API login
    return of({
      isSuccess: false
    });
  }

  logout() {
    this._token.next(null);
    this._isAdmin.next(false);
  }
}
