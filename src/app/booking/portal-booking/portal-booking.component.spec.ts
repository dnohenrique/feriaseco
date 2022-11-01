import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalBookingComponent } from './portal-booking.component';

describe('PortalBookingComponent', () => {
  let component: PortalBookingComponent;
  let fixture: ComponentFixture<PortalBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
