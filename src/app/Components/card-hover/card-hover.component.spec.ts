import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHoverComponent } from './card-hover.component';

describe('CardHoverComponent', () => {
  let component: CardHoverComponent;
  let fixture: ComponentFixture<CardHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
