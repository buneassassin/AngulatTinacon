import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinacoDetalleComponent } from './tinaco-detalle.component';

describe('TinacoDetalleComponent', () => {
  let component: TinacoDetalleComponent;
  let fixture: ComponentFixture<TinacoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinacoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinacoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
