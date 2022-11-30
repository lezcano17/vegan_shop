import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/environments/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RegistroVentasProductosComponent } from './registro-ventas-productos/registro-ventas-productos.component';
import { ReporteResumidoComponent } from './reporte-resumido/reporte-resumido.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';
import { ConfirmationDialog } from './shared/confirm-delete.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { DialogOverviewExampleDialog } from './productos/productos.component'
import { DialogOverviewExampleDialogCliente } from './clientes/clientes.component'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ClientesComponent,
    RegistroVentasProductosComponent,
    ReporteResumidoComponent,
    ReporteDetalladoComponent,
    ConfirmationDialog,
    CrearProductoComponent,
    CrearClienteComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogCliente
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
