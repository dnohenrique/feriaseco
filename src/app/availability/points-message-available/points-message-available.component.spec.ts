import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointsMessageAvailableComponent } from './points-message-available.component';

describe('PonitsMessageComponent', () => {
  let component: PointsMessageAvailableComponent;
  let fixture: ComponentFixture<PointsMessageAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointsMessageAvailableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsMessageAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
