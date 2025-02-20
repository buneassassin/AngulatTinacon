import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TinacoComponent } from './tinaco.component';
import { RectangleRowsComponent} from '../../Components/rectangle-rows/rectangle-rows.component';

describe('TinacoComponent', () => {
  let component: TinacoComponent;
  let fixture: ComponentFixture<TinacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinacoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
