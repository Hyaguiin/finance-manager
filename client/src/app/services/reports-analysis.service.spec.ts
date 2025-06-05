import { TestBed } from '@angular/core/testing';

import { ReportsAnalysisService } from './reports-analysis.service';

describe('ReportsAnalysisService', () => {
  let service: ReportsAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
