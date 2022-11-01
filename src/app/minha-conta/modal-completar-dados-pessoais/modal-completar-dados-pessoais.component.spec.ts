import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompletarDadosPessoaisComponent } from './modal-completar-dados-pessoais.component';

describe('ModalCompletarDadosPessoaisComponent', () => {
  let component: ModalCompletarDadosPessoaisComponent;
  let fixture: ComponentFixture<ModalCompletarDadosPessoaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompletarDadosPessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompletarDadosPessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
