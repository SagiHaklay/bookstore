import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { CartService } from './cart.service';

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
  constructor(private cartService: CartService) { 
    this._token.next(localStorage.getItem('token'));
    this._currentUserId.next(localStorage.getItem('userId'));
    localStorage.setItem('users', JSON.stringify([
      { id: '1', username: 'admin', password: 'admin', email: 'admin@gmail.com', isAdmin: true},
      { id: '2', username: 'user', password: 'password', email: 'user@gmail.com', isAdmin: false},
    ]));
  }

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
    // const user = this._mockUsers.find(u => u.username === username && u.password === password);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      this._token.next(user.token);
      this._isAdmin.next(checkAdmin && user.isAdmin);
      this._currentUserId.next(user.id);
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.id);
      this.cartService.saveGuestCartToUser(user.id);
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  checkIsAdmin() {
    const userId = localStorage.getItem('userId');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    const isUserAdmin = user != null && user.isAdmin;
    this._isAdmin.next(isUserAdmin);
    return of(isUserAdmin);
  }
}
