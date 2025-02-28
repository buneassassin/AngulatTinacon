import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionIndivComponent } from './notificacion-indiv.component';

describe('NotificacionIndivComponent', () => {
  let component: NotificacionIndivComponent;
  let fixture: ComponentFixture<NotificacionIndivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionIndivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
