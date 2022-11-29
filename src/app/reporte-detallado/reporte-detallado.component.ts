import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';
import { RegistroVentasProducto } from '../registro-ventas-productos/registro-ventas-productos.model';

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.scss']
})
export class ReporteDetalladoComponent {
  displayedColumns: string[] = ['cliente', 'fecha', 'totalVenta', 'factura'];
  dataSource = new MatTableDataSource<RegistroVentasProducto>();
  data: RegistroVentasProducto[] = []
  dataObject = Object.assign(this.data)


  constructor(private localStorage: LocalService) { }


  ngOnInit() {
    this.data = this.localStorage.getRegistros();
    this.dataObject = Object.assign(this.data);
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }

}
