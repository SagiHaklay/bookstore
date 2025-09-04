import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {
  private _openModalSubject = new BehaviorSubject<string | null>(null);
  openModalId = this._openModalSubject.asObservable();
  private _registeredIds = new Set();
  constructor() { }

  registerModal(id: string) {
    if (this._registeredIds.has(id)) {
      throw new Error('Modal ID already registered');
    }
    this._registeredIds.add(id);
  }
  openModal(id: string) {
    if (!this._registeredIds.has(id)) {
      throw new Error('Uregistered modal');
    }
    this._openModalSubject.next(id);
  }
  closeModal() {
    this._openModalSubject.next(null);
  }
}
