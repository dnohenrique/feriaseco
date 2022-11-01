import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmComponent } from './mgm.component';

describe('MgmComponent', () => {
  let component: MgmComponent;
  let fixture: ComponentFixture<MgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
