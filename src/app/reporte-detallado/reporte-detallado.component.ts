import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';
import { Producto } from '../productos/productos.model';
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
  formGroupProduct!: FormGroup;
  productos: Producto[] = [];
  selectedProduct!: Producto;

  formGroupHeader!: FormGroup;

  fechaDesde: any;
  fechaHasta: any;


  constructor(private localStorage: LocalService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.data = this.localStorage.getRegistros();
    this.dataObject = Object.assign(this.data);
    this.productos = this.localStorage.getProductos();
    this.createForms();
    
    this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
  }

  createForms() {
    this.formGroupHeader = this.formBuilder.group({
      'fechaDesde': [null, Validators.required],
      'fechaHasta': [null, Validators.required],
    });

    this.formGroupProduct = this.formBuilder.group({
      'producto': [null, Validators.required],
    });
  }

  onSubmit(){
    this.fechaDesde = this.formGroupHeader.value.fechaDesde;
    this.fechaHasta = this.formGroupHeader.value.fechaHasta;
    this.fechaDesde = this.fechaDesde.getTime();
    this.fechaHasta = this.fechaHasta.getTime();

    if (this.fechaDesde > this.fechaHasta) {
      alert('Error en la fecha')
    }

    let elemento: any;
    let copia = [];

    for(let i = 0; i < this.data.length; i++){
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

    filtrarProducto(){
      let elemento: any;
      let copia: RegistroVentasProducto[] = [];
      for (let i = 0; i < this.data.length; i++){
        elemento = this.data[i];
        console.log(this.selectedProduct.nombre)
        
        for(let k = 0; k < elemento.productosComprados.length; k++){
          console.log(elemento.productosComprados[k].producto.nombre)
          if (elemento.productosComprados[k].producto.nombre === this.selectedProduct.nombre){
            if(!copia.includes(this.data[i]))
            copia.push(this.data[i]);
          }
        }
        
      }
      this.data = copia
      console.log(copia)
      this.dataObject = Object.assign(this.data);
      this.dataSource = new MatTableDataSource<RegistroVentasProducto>(this.dataObject);
    }

}
