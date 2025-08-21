import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable()
export class AuthService {
  private _token = new BehaviorSubject<string | null>(null);
  token = this._token.asObservable();
  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = this._isAdmin.asObservable();
  private _currentUserId = new BehaviorSubject<string | null>(null);
  currentUserId = this._currentUserId.asObservable();
  private _mockUsers = [
    { username: 'admin', password: 'admin', isAdmin: true, token: 'admintoken', id: '1' },
    { username: 'user', password: 'password', isAdmin: false, token: 'token', id: '2' }
  ];
  constructor() { }

  login(username: string, password: string, checkAdmin: boolean = false): Observable<AuthResponse> {
    // const storedToken = localStorage.getItem('token');
    // if (storedToken !== null) {
    //   this._token.next(storedToken);
    //   // const storedIsAdmin = localStorage.getItem('isAdmin');
    //   // this._isAdmin.next(storedIsAdmin === 'true');
    //   return of({
    //     token: storedToken,
    //     isAdmin: false,
    //   });
    // }
    const user = this._mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      this._token.next(user.token);
      this._isAdmin.next(checkAdmin && user.isAdmin);
      this._currentUserId.next(user.id);
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id);
      return of({
        token: user.token,
        isAdmin: checkAdmin && user.isAdmin,
        userId: user.id
      });
    }
    // REST API login
    return throwError(() => new Error('Username and/or password are incorrect!'));
  }
  signUp(userData: any) {
    this._mockUsers.push(userData);
  }
  logout() {
    this._token.next(null);
    this._isAdmin.next(false);
    this._currentUserId.next(null);
    localStorage.clear();
  }
}
