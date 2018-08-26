import { TestBed, async, inject } from '@angular/core/testing';

import { FetchUserGuard } from './fetch-user.guard';

describe('FetchUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchUserGuard]
    });
  });

  it('should ...', inject([FetchUserGuard], (guard: FetchUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
