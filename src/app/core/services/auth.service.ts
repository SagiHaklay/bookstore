import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService {
  private _token = new BehaviorSubject<string | null>(null);
  token = this._token.asObservable();
  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = this._isAdmin.asObservable();
  constructor() { }

  login(username: string, password: string) {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {
      this._token.next(storedToken);
      const storedIsAdmin = localStorage.getItem('isAdmin');
      this._isAdmin.next(storedIsAdmin === 'true');
      return of({
        token: storedToken,
        isSuccess: true
      });
    }
    // REST API login
    return of({
      isSuccess: false
    });
  }

  mockSignup(isAdmin: boolean) {
    localStorage.setItem('token', 'mockToken');
    localStorage.setItem('isAdmin', isAdmin? 'true' : 'false');
  }
}
