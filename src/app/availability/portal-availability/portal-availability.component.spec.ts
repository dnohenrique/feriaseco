import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalAvailabilityComponent } from './portal-availability.component';

describe('PortalAvailabilityComponent', () => {
  let component: PortalAvailabilityComponent;
  let fixture: ComponentFixture<PortalAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
