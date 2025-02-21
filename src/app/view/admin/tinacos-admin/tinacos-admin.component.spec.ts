import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinacosAdminComponent } from './tinacos-admin.component';

describe('TinacosAdminComponent', () => {
  let component: TinacosAdminComponent;
  let fixture: ComponentFixture<TinacosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinacosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinacosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
