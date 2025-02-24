import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinacoIndivComponent } from './tinaco-indiv.component';

describe('TinacoIndivComponent', () => {
  let component: TinacoIndivComponent;
  let fixture: ComponentFixture<TinacoIndivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinacoIndivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinacoIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
