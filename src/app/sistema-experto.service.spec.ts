import { TestBed } from '@angular/core/testing';

import { SistemaExpertoService } from './sistema-experto.service';

describe('SistemaExpertoService', () => {
  let service: SistemaExpertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SistemaExpertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
