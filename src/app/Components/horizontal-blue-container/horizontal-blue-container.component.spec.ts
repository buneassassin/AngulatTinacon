import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBlueContainerComponent } from './horizontal-blue-container.component';

describe('HorizontalBlueContainerComponent', () => {
  let component: HorizontalBlueContainerComponent;
  let fixture: ComponentFixture<HorizontalBlueContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalBlueContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalBlueContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
