import { TestBed } from '@angular/core/testing';

import { ServiceStorageService } from './service-storage.service';

describe('ServiceStorageService', () => {
  let service: ServiceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
