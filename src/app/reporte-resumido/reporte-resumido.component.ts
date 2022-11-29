import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.scss']
})
export class ReporteResumidoComponent {
  displayedColumns: string[] = ['cliente', 'fecha', 'totalVenta', 'factura'];
  dataSource = new MatTableDataSource<String>();
  data: String[] = []
  dataObject = Object.assign(this.data)
  
  constructor(private localStorage: LocalService){}

  ngOnInit(){
    this.dataSource = new MatTableDataSource<String>(this.dataObject)
  }



}
