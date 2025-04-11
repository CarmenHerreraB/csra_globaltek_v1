import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionActivosComponent } from './configuracion-activos.component';

describe('ConfiguracionActivosComponent', () => {
  let component: ConfiguracionActivosComponent;
  let fixture: ComponentFixture<ConfiguracionActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
