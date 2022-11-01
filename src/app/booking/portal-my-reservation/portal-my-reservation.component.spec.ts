import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMyReservationComponent } from './portal-my-reservation.component';

describe('PortalMyReservationComponent', () => {
  let component: PortalMyReservationComponent;
  let fixture: ComponentFixture<PortalMyReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMyReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
