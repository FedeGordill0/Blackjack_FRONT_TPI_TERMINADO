import { TestBed } from '@angular/core/testing';

import { JugadaService } from './jugada.service';

describe('JugadaService', () => {
  let service: JugadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
