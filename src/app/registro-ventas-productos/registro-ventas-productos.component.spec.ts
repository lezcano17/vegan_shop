import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVentasProductosComponent } from './registro-ventas-productos.component';

describe('RegistroVentasProductosComponent', () => {
  let component: RegistroVentasProductosComponent;
  let fixture: ComponentFixture<RegistroVentasProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroVentasProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVentasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
