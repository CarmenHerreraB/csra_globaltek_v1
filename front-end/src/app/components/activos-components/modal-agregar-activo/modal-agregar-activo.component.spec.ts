import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarActivoComponent } from './modal-agregar-activo.component';

describe('ModalAgregarActivoComponent', () => {
  let component: ModalAgregarActivoComponent;
  let fixture: ComponentFixture<ModalAgregarActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAgregarActivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
