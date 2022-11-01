import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarConfirmacaoEmailComponent } from './solicitar-confirmacao-email.component';

describe('SolicitarConfirmacaoEmailComponent', () => {
  let component: SolicitarConfirmacaoEmailComponent;
  let fixture: ComponentFixture<SolicitarConfirmacaoEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarConfirmacaoEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarConfirmacaoEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
