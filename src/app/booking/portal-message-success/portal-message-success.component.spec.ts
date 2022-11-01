import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMessageSuccessComponent } from './portal-message-success.component';

describe('PortalMessageComponent', () => {
  let component: PortalMessageSuccessComponent;
  let fixture: ComponentFixture<PortalMessageSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMessageSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
