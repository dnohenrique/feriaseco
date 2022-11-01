import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from 'src/app/shared/support/util';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Common } from '@ferias-e-co/availability';
import { ColaboradorService } from 'src/app/shared/services/colaborador.service';
import { MgmService } from 'src/app/shared/services/mgm.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlCarousel } from 'ngx-owl-carousel';
declare var $: any;


@Component({
  selector: 'app-portal-availability',
  templateUrl: './portal-availability.component.html',
  styleUrls: ['./portal-availability.component.scss']
})
export class PortalAvailabilityComponent implements OnInit {
  @ViewChild('pointsModal', { static: true }) pointsModal: any;
  @ViewChild('owlElement', { static: true }) owlElement: OwlCarousel;
  isDestinationFocus: boolean;
  isRoomsFocus: boolean;
  isCheckinFocus: boolean;
  isCheckoutFocus: boolean;
  isDestinationAirFocus: boolean;
  isPaxAirFocus: boolean;
  isCheckinAirFocus: boolean;
  isCheckoutAirFocus: boolean;
  userFirstName = '';
  availableDays = 0;
  availablePoints = null;
  availablePointsFormat = '';
  typePlan = '';
  isMobile: boolean;
  showMgm = false;
  isRecommend = false;
  isPlan = false;
  modalRefPoints: BsModalRef;
  loading = false;
  notificationLoading = false;
  productId = 1; changeProduct = false;
  points: any = { available: 0 };
  productOptions: any = {
    loop: false,
    items: 1,
    dots: false,
    nav: false,
    navSpeed: 800,
    autoWidth: false,
    margin: 0,
    merge: false,
    lazyLoad: false,
    navText: ['', ''],
    mouseDrag: false,
    touchDrag: false
  };
  isBlackFriday = false;

  constructor(
    private modalService: BsModalService,
    private graphqlService: ColaboradorService,
    private mgmService: MgmService,
    private deviceService: DeviceDetectorService,
    private util: Util,
    private router: Router,
    private actRouter: ActivatedRoute,
    public common: Common) {

    document.addEventListener('DOMContentLoaded', (event) => {
      this.verifyIsMobile();
    });
    document.addEventListener('click', (event) => {
      this.verifyIsMobile();
    });
    window.addEventListener('resize', (event) => {
      this.verifyIsMobile();
    });
    window.addEventListener('scroll', (event) => {
      this.verifyIsMobile();
    });
  }

  async ngOnInit() {
    this.common.toScrollTop();
    this.verifyIsMobile();

    await this.loadUserById();
    await this.getPointAvailable();
    await this.verificarIndiqueGanhe();

    this.actRouter.params.forEach((a) => {
      this.updateProduct(Number(a.productId) || 1);
    });

    this.util.showAlertCovid(this.productId);

    var currentDateTime = new Date();
    var endBlackFriday = new Date('2021-11-21 00:00:00');

    if (currentDateTime < endBlackFriday) {
      this.isBlackFriday = true;
    }
  }

  async loadUserById() {
    try {
      const result = await this.util.getColaboradorDetail();

      this.userFirstName = result.userFirstName.split(' ')[0];
      this.availableDays = result.availableDays;
      this.availablePoints = result.availablePoints;
      this.availablePointsFormat = !result.availablePointsFormat ? '0' : result.availablePointsFormat;
      this.typePlan = result.typePlan;
      this.isRecommend = true;
      sessionStorage.setItem('typePlan', this.typePlan);
      this.loading = true;
    } catch (error) {
      this.loading = true;
      console.error(error);
    }
  }

  async getPointAvailable() {
    try {
      const cpf = sessionStorage.getItem('xdc');
      const result = await this.graphqlService.getPontosNotificacao(cpf);
      const response = result.data.getNewPointsNotification;
      if (response && response.status && response.notification) {
        this.points = response.notification;
        if (this.points.amount > 0) {
          this.viewModalPoints();
        }
      }
      this.notificationLoading = true;
    } catch (error) {
      this.notificationLoading = true;
      console.error(error);
    }
  }

  async verificarIndiqueGanhe() {
    const cnpj = sessionStorage.getItem('acc');
    const cpf = sessionStorage.getItem('xdc');

    try {
      const response = await this.mgmService.consultarSePodeVerIndiqueGanhe(cnpj, cpf);
      this.showMgm = response &&
        response.result &&
        response.result.acessar &&
        response.result.indicar;
    } catch (error) {
      this.showMgm = false;
      console.error(error);
    }
  }

  updateProduct(id: number) {
    this.productId = id;
    this.changeProduct = false;

    this.util.showAlertCovid(this.productId);

    if (this.productId === 2) {
      this.owlElement.next();
    } else {
      this.owlElement.previous();
    }

    setTimeout(() => {
      this.changeProduct = true;
    }, 400);
  }

  topScroll(focus) {
    if (this.isMobile && focus) {
      const selector = '.btn-back';

      setTimeout(() => {
        this.common.toScrollTop(selector, 400);
      }, 100);
    }
  }

  changeDestinationFocus(focus) { this.isDestinationFocus = focus; this.topScroll(focus); }

  changeRoomsFocus(focus) { this.isRoomsFocus = focus; this.topScroll(focus); }

  changeCheckinFocus(focus) { this.isCheckinFocus = focus; this.topScroll(focus); }

  changeCheckoutFocus(focus) { this.isCheckoutFocus = focus; this.topScroll(focus); }

  changeDestinationAirFocus(focus) { this.isDestinationAirFocus = focus; this.topScroll(focus); }

  changePaxAirFocus(focus) { this.isPaxAirFocus = focus; this.topScroll(focus); }

  changeCheckinAirFocus(focus) { this.isCheckinAirFocus = focus; this.topScroll(focus); }

  changeCheckoutAirFocus(focus) { this.isCheckoutAirFocus = focus; this.topScroll(focus); }

  verifyIsMobile() { this.isMobile = window.matchMedia('(max-width: 657px)').matches ? true : false; }

  callBackResult(result) {
    this.isRecommend = result.length > 0;
    this.isPlan = !this.isRecommend;
  }

  viewModalPoints() {
    this.modalRefPoints = this.modalService.show(this.pointsModal, { ignoreBackdropClick: true, class: 'fc-modal modal-dialog-centered' });
    if (this.deviceService.browser !== 'IE') {
      this.common.hideBodyScroll();
    }
  }

  goToIndiqueGanhe() {
    this.router.navigate(['indique-ganhe']);
  }

  // tslint:disable-next-line: cyclomatic-complexity
  setPlanDescription() {
    if (this.typePlan !== 'Plano ContaGratuita') {
      const diariasDescription =
        `${this.availableDays} diária${this.availableDays >= 0 ? 's' : ''}`;
      const pontosDescription = this.availablePoints > 0 ?
        ` + ${this.availablePointsFormat} ponto${this.availablePoints >= 0 ? 's' : ''}` : '';

      return `${diariasDescription}${pontosDescription}`;
    }

    if (this.typePlan === 'Plano ContaGratuita') {
      const pontosDescription = this.availablePoints > 0 ?
        `${this.availablePointsFormat} ponto${this.availablePoints >= 0 ? 's' : ''}` : '';

      return `${pontosDescription}`;
    }
  }
}
