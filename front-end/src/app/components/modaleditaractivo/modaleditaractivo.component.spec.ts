import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditaractivoComponent } from './modaleditaractivo.component';

describe('ModaleditaractivoComponent', () => {
  let component: ModaleditaractivoComponent;
  let fixture: ComponentFixture<ModaleditaractivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModaleditaractivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditaractivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
