import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinacoSensorComponent } from './tinaco-sensor.component';

describe('TinacoSensorComponent', () => {
  let component: TinacoSensorComponent;
  let fixture: ComponentFixture<TinacoSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinacoSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinacoSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
