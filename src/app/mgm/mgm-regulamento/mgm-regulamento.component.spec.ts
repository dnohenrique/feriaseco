import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmRegulamentoComponent } from './mgm-regulamento.component';

describe('MgmRegulamentoComponent', () => {
  let component: MgmRegulamentoComponent;
  let fixture: ComponentFixture<MgmRegulamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmRegulamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmRegulamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
