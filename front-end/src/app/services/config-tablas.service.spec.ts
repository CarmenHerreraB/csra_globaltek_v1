import { TestBed } from '@angular/core/testing';

import { ConfigTablasService } from './config-tablas.service';

describe('ConfigTablasService', () => {
  let service: ConfigTablasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigTablasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
