import { TestBed } from '@angular/core/testing';

import { AseguradosService } from './asegurados.service';

describe('AseguradosService', () => {
  let service: AseguradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
