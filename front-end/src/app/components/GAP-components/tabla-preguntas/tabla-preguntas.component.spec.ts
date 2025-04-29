import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPreguntasComponent } from './tabla-preguntas.component';

describe('TablaPreguntasComponent', () => {
  let component: TablaPreguntasComponent;
  let fixture: ComponentFixture<TablaPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaPreguntasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
