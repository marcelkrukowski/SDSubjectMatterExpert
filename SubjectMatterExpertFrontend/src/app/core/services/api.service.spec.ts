import { TestBed } from '@angular/core/testing';

import { ServiceLoginService } from './api.service';

describe('ServiceLoginService', () => {
  let service: ServiceLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
