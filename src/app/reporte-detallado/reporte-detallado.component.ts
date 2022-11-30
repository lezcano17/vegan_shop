import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';
import { RegistroVentasProducto } from '../registro-ventas-productos/registro-ventas-productos.model';

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReporteDetalladoComponent {
  displayedColumns: string[] = ['cliente', 'fecha', 'totalVenta', 'factura'];
  columnsToDisplayWithExpand = [...this.displayedColumns, ];
  innerDisplayedColumns = ['nombre','cantidad','detalles'];
  expandedElement: RegistroVentasProducto | undefined;

  dataSource = new MatTableDataSource<RegistroVentasProducto>();
  data: RegistroVentasProducto[] = [];
  dataObject = Object.assign(this.data);


  constructor(private localStorage: LocalService) { }


  ngOnInit() {
    this.data = this.localStorage.getRegistros();
    this.dataObject = Object.assign(this.data);
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }

}
