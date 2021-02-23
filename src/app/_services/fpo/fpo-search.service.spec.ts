import { TestBed } from '@angular/core/testing';

import { FpoSearchService } from './fpo-search.service';

describe('FpoSearchService', () => {
  let service: FpoSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FpoSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
