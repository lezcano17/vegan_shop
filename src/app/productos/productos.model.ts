export class Producto{
    codigo: number;
    nombre: string;
    precioVenta: number;
    existencia: number;

    constructor(
        codigo: number,
        nombre: string,
        precioVenta: number,
        existencia: number,
    ){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precioVenta = precioVenta;
        this.existencia = existencia;
    }
}