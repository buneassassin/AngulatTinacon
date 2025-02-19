import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleRowsComponent } from './rectangle-rows.component';

describe('RectangleRowsComponent', () => {
  let component: RectangleRowsComponent;
  let fixture: ComponentFixture<RectangleRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangleRowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
