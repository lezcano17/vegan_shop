import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes/clientes.model';
import { LocalService } from '../local.service';
import { Producto } from '../productos/productos.model';
import { ConfirmationDialog } from '../shared/confirm-delete.component';
import { RegistroVentasProducto } from './registro-ventas-productos.model';

export class Productos{
  producto: Producto;
  cantidad: number;
  detalle: string;

  constructor(
    producto: Producto,
    cantidad: number,
    detalle: string,
  ){
    this.producto = producto;
    this.cantidad = cantidad;
    this.detalle = detalle;
  }
}

@Component({
  selector: 'app-registro-ventas-productos',
  templateUrl: './registro-ventas-productos.component.html',
  styleUrls: ['./registro-ventas-productos.component.scss']
})

export class RegistroVentasProductosComponent {
  formGroupHeader!: FormGroup;
  formGroupProduct!: FormGroup;
  selectedProduct!: Producto;
  selectedClient!: Cliente;

  productos: Producto[] = [];
  clientes: Cliente[] = [];

  displayedColumns: string[] = ['producto', 'cantidad', 'detalle', 'eliminar'];
  dataSource = new MatTableDataSource<Productos>();
  data: Productos[] = [];
  dataObject = Object.assign(this.data);
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar, private localStorage: LocalService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Productos>(this.dataObject);
    this.productos = this.localStorage.getProductos();
    this.clientes = this.localStorage.getClientes();
    console.log(this.productos);
    this.createForms();
  }

  createForms() {
    this.formGroupHeader = this.formBuilder.group({
      'id': [null, Validators.required],
      'fecha': [null, Validators.required],
      'numeroFactura': [null, Validators.required],
      'cliente': [null, Validators.required],
      'total': [0, Validators.required]
    });

    this.formGroupProduct = this.formBuilder.group({
      'producto': [null, Validators.required],
      'cantidad': [null, Validators.required],
      'totalDetalle': [null, Validators.required],
    });
  }

  onSubmit() {
    const id = this.formGroupHeader.value.id
    const fecha = this.formGroupHeader.value.nombre;
    const numeroFactura = this.formGroupHeader.value.numeroFactura;
    const cliente = this.selectedClient;    
    const total = this.formGroupHeader.value.total;
    const registroVenta = new RegistroVentasProducto(id,fecha,numeroFactura,cliente,total,this.data);
    this.formGroupHeader.reset();
  }

  openDialog(productoTotal: Productos) {
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
        this.data.splice(this.data.indexOf(productoTotal), 1);
        this.formGroupHeader.patchValue({total: Number(this.formGroupHeader.get('total')?.value)-Number(productoTotal.producto.precioVenta)*Number(productoTotal.cantidad)});

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
    const cantidad = this.formGroupProduct.value.cantidad;
    const detalle = this.formGroupProduct.value.totalDetalle;
    const row = new Productos(this.selectedProduct,cantidad,detalle);
    this.formGroupHeader.patchValue({total: Number(this.formGroupHeader.get('total')?.value)+Number(this.selectedProduct.precioVenta)*Number(cantidad)});
    this.data.push(row);
    this.dataSource = new MatTableDataSource<Productos>(this.dataObject)
  }

}
