import { TestBed } from '@angular/core/testing';

import { SessionFormService } from './session-form.service';

describe('SessionFormService', () => {
  let service: SessionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
