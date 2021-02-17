import { TestBed } from '@angular/core/testing';

import { GetTranslationService } from './get-translation.service';

describe('GetTranslationService', () => {
  let service: GetTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
