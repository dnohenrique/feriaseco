import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-completar-dados-pessoais',
  templateUrl: './modal-completar-dados-pessoais.component.html',
  styleUrls: ['./modal-completar-dados-pessoais.component.scss']
})
export class ModalCompletarDadosPessoaisComponent implements OnInit {
  @Input() visibilityModal: boolean;
  @Output() visibilityEvent = new EventEmitter();
  @Output() actions = new EventEmitter();

  loading: boolean;
  submitButtonClicked: boolean;
  disableButtonSubmit: boolean;

  constructor(private router: Router) {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLTextAreaElement;
      if (target.id === 'modal-shadow') {
        this.fecharModal();
      }
    });

  }

  ngOnInit() {

  }

  goHome() {
    this.fecharModal();
    this.router.navigate(['/home']);
  }

  goSubmit() {
    this.fecharModal();
    this.actions.emit({ novoValor: false });
  }

  fecharModal() {
    const elementModalBody = document.getElementById('modal-body-quality');
    elementModalBody.scrollTop = 0;
    if (elementModalBody.scrollTop > 0) {elementModalBody.style.overflowY = 'scroll'; }
    this.visibilityModal = false;
    this.visibilityEvent.emit({novoValor: false});
  }

}
