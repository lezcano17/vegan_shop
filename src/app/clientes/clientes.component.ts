import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from '../local.service';
import { ConfirmationDialog } from '../shared/confirm-delete.component';
import { Cliente } from './clientes.model';


@Component({
  selector: 'select-dialog',
  templateUrl: './open-dialog.html',
})
export class DialogOverviewExampleDialogCliente {
  formGroup!: FormGroup;
  cliente!: Cliente;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogCliente>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente, private formBuilder: FormBuilder, private localStorage: LocalService
  ) {}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      'nombreApellido': [null, Validators.required],
      'email': [null, Validators.required]
    });
    this.formGroup.get('nombreApellido')?.setValue(this.data.nombreApellido);
    this.formGroup.get('email')?.setValue(this.data.email);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const ruc = this.data.ruc
    const nombreApellido = this.formGroup.value.nombreApellido
    const email = this.formGroup.value.email
    const newCliente = new Cliente(ruc, nombreApellido, email);
    console.log(newCliente)
    this.localStorage.updateCliente(newCliente);
  }
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = ['ruc', 'nombreApellido', 'email', 'eliminar', 'update'];
  dataSource = new MatTableDataSource<Cliente>();
  data: Cliente[] = [];
  dataObject = Object.assign(this.data);


  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private localStorage: LocalService) { };

  ngOnInit() {
    this.data = this.localStorage.getClientes();
    this.dataObject = Object.assign(this.data)
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
        
        this.localStorage.deleteCliente(cliente)
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

  addElement(cliente: Cliente) {
    let result = this.localStorage.addCliente(cliente)
    if (result == null) {
      alert('El cliente ya existe');
    }
    this.dataSource = new MatTableDataSource<Cliente>(this.dataObject)
  }

  openUpdate(cliente: Cliente): void {
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogCliente, {
      width: '250px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


}
