import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTablasComponent } from './config-tablas.component';

describe('ConfigTablasComponent', () => {
  let component: ConfigTablasComponent;
  let fixture: ComponentFixture<ConfigTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigTablasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
