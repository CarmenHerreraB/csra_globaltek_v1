import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCalculadoraComponent } from './config-calculadora.component';

describe('ConfigCalculadoraComponent', () => {
  let component: ConfigCalculadoraComponent;
  let fixture: ComponentFixture<ConfigCalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigCalculadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
