import { Component, Inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './productos.model';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from '../local.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'select-dialog',
  templateUrl: './open-dialog.html',
})
export class DialogOverviewExampleDialog {
  formGroup!: FormGroup;
  producto!: Producto;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Producto, private formBuilder: FormBuilder, private localStorage: LocalService
  ) {}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'precioVenta': [null, Validators.required],
      'existencia': [null, Validators.required]
    });
    this.formGroup.get('nombre')?.setValue(this.data.nombre);
    this.formGroup.get('precioVenta')?.setValue(this.data.precioVenta);
    this.formGroup.get('existencia')?.setValue(this.data.existencia);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const codigo = this.data.codigo
    const nombre = this.formGroup.value.nombre
    const precioVenta = this.formGroup.value.precioVenta
    const existencia = this.formGroup.value.existencia
    const newProducto = new Producto(codigo, nombre, precioVenta, existencia);
    this.localStorage.updateProducto(newProducto);
    console.log(this.localStorage.getProductos())
    
  }


}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent {
  displayedColumns: string[] = ['codigo', 'nombre', 'precioVenta', 'existencia', 'eliminar', 'update'];
  dataSource = new MatTableDataSource<Producto>();
  data: Producto[] = [];
  dataObject = Object.assign(this.data)
  

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private localStorage: LocalService) {};
  
  ngOnInit(){
    console.log(this.data)
    this.data = this.localStorage.getProductos();
    console.log(this.data)
    this.dataObject = Object.assign(this.data)
    this.dataSource = new MatTableDataSource<Producto>(this.dataObject)
  }

  openDialog(producto: Producto) {
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
        this.localStorage.deleteProducto(producto);
        console.log(this.dataSource.data)

        this.dataSource = new MatTableDataSource<Producto>(this.dataObject)

        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Deleted', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  addElement(producto: Producto){
    let result = this.localStorage.addProducto(producto);
    if (result == null) {
      alert('El producto ya existe');
    }
    this.dataSource = new MatTableDataSource<Producto>(this.dataObject)
  }

  openUpdate(producto: Producto): void {
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

} 
