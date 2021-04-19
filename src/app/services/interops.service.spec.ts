import { TestBed } from '@angular/core/testing';

import { InteropsService } from './interops.service';

describe('InteropsService', () => {
  let service: InteropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
