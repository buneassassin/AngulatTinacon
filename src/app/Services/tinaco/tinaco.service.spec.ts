import { TestBed } from '@angular/core/testing';

import { TinacoService } from './tinaco.service';

describe('TinacoService', () => {
  let service: TinacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
