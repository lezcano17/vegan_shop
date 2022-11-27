import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroVentasProductosComponent } from './registro-ventas-productos/registro-ventas-productos.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';
import { ReporteResumidoComponent } from './reporte-resumido/reporte-resumido.component';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'registro-ventas-productos',
    component: RegistroVentasProductosComponent,
  },
  {
    path: 'reporte-detallado',
    component: ReporteDetalladoComponent,
  },
  {
    path: 'reporte-resumido',
    component: ReporteResumidoComponent,
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
