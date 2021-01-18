import { TestBed } from '@angular/core/testing';

import { FpoService } from './fpo.service';

describe('FpoService', () => {
  let service: FpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
