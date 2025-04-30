import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMadurezComponent } from './tabla-madurez.component';

describe('TablaMadurezComponent', () => {
  let component: TablaMadurezComponent;
  let fixture: ComponentFixture<TablaMadurezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaMadurezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaMadurezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
