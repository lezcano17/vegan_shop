import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../clientes/clientes.model';
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
  formGroupFecha!: FormGroup;
  selectedClient!: Cliente;

  fechaDesde: any;
  fechaHasta: any;
  rucCliente: any;
  clientes!: Cliente[];
  formGroupCliente!: FormGroup;

  constructor(private localStorage: LocalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = this.localStorage.getRegistros();
    this.dataObject = Object.assign(this.data);
    this.createForms();
    this.clientes = this.localStorage.getClientes();
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }

  createForms() {
    this.formGroupFecha = this.formBuilder.group({
      'fechaDesde': [null, Validators.required],
      'fechaHasta': [null, Validators.required],
    });
    this.formGroupCliente = this.formBuilder.group({
      'cliente': [null, Validators.required]
    });
  }

  onSubmit() {
    this.fechaDesde = this.formGroupFecha.value.fechaDesde;
    this.fechaHasta = this.formGroupFecha.value.fechaHasta;
    this.fechaDesde = this.fechaDesde.getTime();
    this.fechaHasta = this.fechaHasta.getTime();

    if (this.fechaDesde > this.fechaHasta) {
      alert('Error en la fecha')
    }

    let elemento: any;
    let copia = [];

    for (let i = 0; i < this.data.length; i++) {
      elemento = this.data[i]
      let date1 = new Date(elemento.fecha).getTime();
      let date2 = new Date(this.fechaDesde).getTime();
      let date3 = new Date(this.fechaHasta).getTime();
      console.log(date1, date2, date3)

      if (date1 >= date2 && date1 <= date3)
        copia.push(this.data[i]);
    }

    this.data = copia
    console.log(copia)
    this.dataObject = Object.assign(this.data);
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);

  }
  filtrarCliente() {
    let elemento: any;
    let copia: RegistroVentasProducto[] = [];

    for (let i = 0; i < this.data.length; i++) {
      elemento = this.data[i];
      console.log(this.selectedClient.nombreApellido)
      if (this.selectedClient.nombreApellido === elemento.cliente.nombreApellido) {
        copia.push(this.data[i]);
      }
    }
    this.data = copia
    console.log(copia)
    this.dataObject = Object.assign(this.data);
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }
}
