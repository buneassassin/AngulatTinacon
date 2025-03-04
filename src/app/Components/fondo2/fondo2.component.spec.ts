import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fondo2Component } from './fondo2.component';

describe('Fondo2Component', () => {
  let component: Fondo2Component;
  let fixture: ComponentFixture<Fondo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fondo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fondo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
