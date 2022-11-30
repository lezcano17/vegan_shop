import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';
import { RegistroVentasProducto } from '../registro-ventas-productos/registro-ventas-productos.model';

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.scss']
})
export class ReporteResumidoComponent {
  displayedColumns: string[] = ['cliente', 'fecha', 'totalVenta', 'factura'];
  dataSource = new MatTableDataSource<RegistroVentasProducto>();
  data: RegistroVentasProducto[] = []
  dataObject = Object.assign(this.data)
  formGroupHeader!: FormGroup;

  fechaDesde!: Date;
  fechaHasta!: Date;
  rucCliente: any;

  constructor(private localStorage: LocalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = this.localStorage.getRegistros();
    this.dataObject = Object.assign(this.data);
    this.createForms();
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }

  createForms() {
    this.formGroupHeader = this.formBuilder.group({
      'fechaDesde': [null, Validators.required],
      'fechaHasta': [null, Validators.required],
    });
  }

  onSubmit(){
    const fechaDesde = this.formGroupHeader.value.fechaDesde;
    const fechaHasta = this.formGroupHeader.value.fechaHasta;
    console.log(typeof(fechaDesde))
    console.log(fechaHasta)
  }

}
