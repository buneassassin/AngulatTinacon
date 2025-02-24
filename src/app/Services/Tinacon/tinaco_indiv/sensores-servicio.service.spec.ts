import { TestBed } from '@angular/core/testing';

import { SensoresServicioService } from './sensores-servicio.service';

describe('SensoresServicioService', () => {
  let service: SensoresServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensoresServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
