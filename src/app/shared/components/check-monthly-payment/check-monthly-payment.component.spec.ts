import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMonthlyPaymentComponent } from './check-monthly-payment.component';

describe('CheckMonthlyPaymentComponent', () => {
  let component: CheckMonthlyPaymentComponent;
  let fixture: ComponentFixture<CheckMonthlyPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckMonthlyPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMonthlyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
