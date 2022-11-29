import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../productos/productos.model';
import { ConfirmationDialog } from '../shared/confirm-delete.component';

export interface Productos{
  producto: Producto;
  cantidad: number;
  detalle: string;
}

@Component({
  selector: 'app-registro-ventas-productos',
  templateUrl: './registro-ventas-productos.component.html',
  styleUrls: ['./registro-ventas-productos.component.scss']
})

export class RegistroVentasProductosComponent {
  formGroupHeader!: FormGroup;
  formGroupProduct!: FormGroup;
  displayedColumns: string[] = ['producto', 'cantidad', 'detalle', 'eliminar'];
  dataSource = new MatTableDataSource<Productos>();
  data: Productos[] = [{producto: new Producto(1, 'tornillo', 1098, 1),cantidad: 2,detalle: 'hola'},
  {producto: new Producto(1, 'tornillo', 1098, 1),cantidad: 2,detalle: 'hola'},
  {producto: new Producto(1, 'tornillo', 1098, 1),cantidad: 2,detalle: 'hola'}];
  dataObject = Object.assign(this.data);
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Productos>(this.dataObject)
    this.createForms();
  }

  createForms() {
    this.formGroupHeader = this.formBuilder.group({
      'id': [null, Validators.required],
      'fecha': [null, Validators.required],
      'numeroFactura': [null, Validators.required],
      'cliente': [null, Validators.required],
      'total': [null, Validators.required]
    });

    this.formGroupProduct = this.formBuilder.group({
      'Producto': [null, Validators.required],
      'Cantidad': [null, Validators.required],
      'Total': [null, Validators.required],
    });
  }

  onSubmit() {
    const id = this.formGroupHeader.value.id
    const fecha = this.formGroupHeader.value.nombre;
    const numeroFactura = this.formGroupHeader.value.numeroFactura;
    const cliente = this.formGroupHeader.value.cliente;    
    const total = this.formGroupHeader.value.total;
  }

  openDialog(producto: Productos) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Esta seguro que desea eliminar este producto?',
        buttonText: {
          ok: 'Sí',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.data.splice(this.data.indexOf(producto), 1);
        console.log(this.dataSource.data)

        this.dataSource = new MatTableDataSource<Productos>(this.dataObject)

        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Deleted', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  addElement(){
    const codigo = this.formGroupProduct.value.producto;
    const nombre = this.formGroupProduct.value.nombre;
    const producto = this.formGroupProduct.value.producto;
    this.data.push(producto);
    this.dataSource = new MatTableDataSource<Productos>(this.dataObject)
  }

}
