import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionAdminComponent } from './notificacion-admin.component';

describe('NotificacionAdminComponent', () => {
  let component: NotificacionAdminComponent;
  let fixture: ComponentFixture<NotificacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
