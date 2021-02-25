import { TestBed } from '@angular/core/testing';

import { ChcFmbService } from './chc-fmb.service';

describe('ChcFmbService', () => {
  let service: ChcFmbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChcFmbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
