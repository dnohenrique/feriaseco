import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeTermComponent } from './upgrade-term.component';

describe('UpgradeTermComponent', () => {
  let component: UpgradeTermComponent;
  let fixture: ComponentFixture<UpgradeTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
