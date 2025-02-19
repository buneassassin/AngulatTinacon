import { TestBed } from '@angular/core/testing';

import { ServicioDePruebaService } from './servicio-de-prueba.service';

describe('ServicioDePruebaService', () => {
  let service: ServicioDePruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDePruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
