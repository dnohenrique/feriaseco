import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Title } from '@angular/platform-browser';
import { Common } from '@ferias-e-co/points';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/shared/services/colaborador.service';

@Component({
  selector: 'app-points-message-available',
  templateUrl: './points-message-available.component.html',
  styleUrls: ['./points-message-available.component.scss']
})
export class PointsMessageAvailableComponent implements OnInit {

  @Input() points: any = {};
  @Input() modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private graphqlService: ColaboradorService,
    public titleService: Title,
    public common: Common,
    private router: Router
  ) { }

  ngOnInit() {
    this.modalService.onHide.subscribe((reason: string) => {
      this.disableNotification();
      this.common.showBodyScroll();
    });
  }

  goToMyPlan() {
    this.hideModal();
    this.router.navigate(['/meu-plano']);
  }

  hideModal() {
    this.modalRef.hide();
  }

  async disableNotification() {

    const pontoAcumuladoIds = [];

    try {
      const userId: string = sessionStorage.getItem('xdc');
      this.points.pointsAccumulation.map((e: { id: string; }) => {
        pontoAcumuladoIds.push(e.id);
      });

      const notificationPut = {
        userId,
        pontoAcumuladoIds
      };

      await this.graphqlService.putPontosNotificacao(notificationPut);

    } catch (error) {
      console.error(error);
    }
  }
}
