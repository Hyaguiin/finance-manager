import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAnalysisCreateComponent } from './transaction-analysis-create.component';

describe('TransactionAnalysisCreateComponent', () => {
  let component: TransactionAnalysisCreateComponent;
  let fixture: ComponentFixture<TransactionAnalysisCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionAnalysisCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAnalysisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
