import { Cliente } from "../clientes/clientes.model";
import { Productos } from "./registro-ventas-productos.component";

export class RegistroVentasProducto {
    id: number;
    fecha: Date;
    numeroFactura: number;
    cliente: Cliente;
    total: number;
    productosComprados: Productos[];

    constructor(
        id: number,
        fecha: Date,
        numeroFactura: number,
        cliente: Cliente,
        total: number,
        productosComprados: Productos[],
    ) {
        this.id = id;
        this.fecha = fecha;
        this.numeroFactura = numeroFactura;
        this.cliente = cliente;
        this.total = total;
        this.productosComprados = productosComprados;
    }
}