import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './productos.model';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from '../shared/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent {
  displayedColumns: string[] = ['codigo', 'nombre', 'precioVenta', 'existencia', 'eliminar'];
  dataSource = new MatTableDataSource<Producto>();
  data: Producto[] = [
    {codigo: 1, nombre: 'Foneca', precioVenta: 10969, existencia: 1},
    {codigo: 2, nombre: 'Junior', precioVenta: 420, existencia: 2},
    {codigo: 3, nombre: 'Junior Blanco', precioVenta: 32525, existencia: 1},
  ];
  dataObject = Object.assign(this.data);
  

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {};
  
  ngOnInit(){
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
        this.data.splice(this.data.indexOf(producto), 1);
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
    this.data.push(producto);
    this.dataSource = new MatTableDataSource<Producto>(this.dataObject)
  }
  
} 
