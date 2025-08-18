import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService {
  private _token = new BehaviorSubject<string | null>(null);
  token = this._token.asObservable();
  constructor() { }

  login(username: string, password: string) {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {
      this._token.next(storedToken);
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
}
