import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialog } from '../shared/confirm-delete.component';
import { Cliente } from './clientes.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = ['ruc', 'nombreApellido', 'email', 'eliminar'];
  dataSource = new MatTableDataSource<Cliente>();
  data: Cliente[] = [
    { ruc: 5479354, nombreApellido: 'Foneca', email: 'foneca@pol.edu.py' },
    { ruc: 4608081, nombreApellido: 'Junior', email: 'junior@pol.edu.py' },
    { ruc: 1212121, nombreApellido: 'Junior Blanco', email: 'junior2@pol.edu.py' },
  ];
  dataObject = Object.assign(this.data);


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { };

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Cliente>(this.dataObject)
  }

  openDialog(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Esta seguro que desea eliminar al cliente de la base de datos?',
        buttonText: {
          ok: 'Sí',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.data.splice(this.data.indexOf(cliente), 1);
        console.log(this.dataSource.data)

        this.dataSource = new MatTableDataSource<Cliente>(this.dataObject)

        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Deleted', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  addElement(producto: Cliente) {
    this.data.push(producto);
    this.dataSource = new MatTableDataSource<Cliente>(this.dataObject)
  }

}
