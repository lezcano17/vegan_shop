import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes.model';
import { Producto } from './productos/productos.model';
import { RegistroVentasProducto } from './registro-ventas-productos/registro-ventas-productos.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  getProductos(): Producto[] {
    return JSON.parse(localStorage.getItem('listaProductos')!);
  }

  addProducto(agregar: Producto): Producto[] | null {
    let productos: Producto[] = this.getProductos();
    console.log(typeof(productos));
    console.log(agregar)
    if (productos != null){
      if (productos.some((producto) => producto.codigo === agregar.codigo)) {
        return null;
      }
      productos.push(agregar);
      localStorage.setItem('listaProductos', JSON.stringify(productos));
    }else{
      let productos: Producto[] = [];
      productos.push(agregar)
      localStorage.setItem('listaProductos', JSON.stringify(productos));
    }
    return productos;
  }

  updateProducto(actualizado: Producto): Producto[] | null {
    let productos: Producto[] = this.getProductos();
    let producto = productos.filter((producto) => producto.codigo === actualizado.codigo)
    if (producto.length == 0) {
      return null;
    }
    productos[productos.indexOf(producto[0])] = actualizado
    localStorage.setItem('listaProductos', JSON.stringify(productos));
    return productos;
  }

  deleteProducto(eliminar: Producto): Producto[] | null {
    let productos: Producto[] = this.getProductos();
    let producto = productos.filter((producto) => producto.codigo === eliminar.codigo)
    if (producto.length == 0) {
      return null;
    }
    productos.splice(productos.indexOf(producto[0]),1)
    localStorage.setItem('listaProductos', JSON.stringify(productos));
    return productos;
  }



  getClientes(): Cliente[] {
    return JSON.parse(localStorage.getItem('listaClientes')!);
  }

  addCliente(agregar: Cliente): Cliente[] | null {
    let clientes: Cliente[] = this.getClientes();
    if (clientes != null){
      if (clientes.some((cliente) => cliente.ruc === agregar.ruc)) {
        return null;
      }
      clientes.push(agregar);
      localStorage.setItem('listaClientes', JSON.stringify(clientes));
    }else{
      let clientes: Cliente[] = [];
      clientes.push(agregar);
      localStorage.setItem('listaClientes', JSON.stringify(clientes));
    }
    return clientes;
  }

  updateCliente(actualizado: Cliente): Cliente[] | null {
    let clientes: Cliente[] = this.getClientes();
    let cliente = clientes.filter(
      (cliente) => cliente.ruc === actualizado.ruc
    );
    if (cliente.length == 0) {
      return null;
    }
    clientes[clientes.indexOf(cliente[0])] = actualizado;
    localStorage.setItem('listaClientes', JSON.stringify(clientes));
    return clientes;
  }

  deleteCliente(eliminar: Cliente): Cliente[] | null {
    let clientes: Cliente[] = this.getClientes();
    let cliente = clientes.filter((cliente) => cliente.ruc === eliminar.ruc);
    if (cliente.length == 0) {
      return null;
    }
    clientes.splice(clientes.indexOf(cliente[0]),1);
    localStorage.setItem('listaClientes', JSON.stringify(clientes));
    return clientes;
  }

getRegistros(): RegistroVentasProducto[]{
  return JSON.parse(localStorage.getItem('registroVentas')!);
  }

  addRegistro(nuevo: RegistroVentasProducto): RegistroVentasProducto[] | null {
    let registros: RegistroVentasProducto[] = this.getRegistros();
    if( registros != null){
      if(registros.some((registro) => registro.id === nuevo.id)){
        return null;
      }
      registros.push(nuevo)
      localStorage.setItem('registroVentas', JSON.stringify(registros))
    }else{
      let registros: RegistroVentasProducto[] = [];
      registros.push(nuevo);
      localStorage.setItem('registroVentas', JSON.stringify(registros))
    }
    return registros;
  }

}
