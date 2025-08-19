import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userAccountResolver } from './user-account.resolver';

describe('userAccountResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userAccountResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
