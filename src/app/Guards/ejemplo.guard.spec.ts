import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { ejemploGuard } from './ejemplo.guard';

describe('ejemploGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ejemploGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
