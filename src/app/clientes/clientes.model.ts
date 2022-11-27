export class Cliente{
    ruc: number;
    nombreApellido: string;
    email: string;

    constructor(
        ruc: number,
        nombreApellido: string,
        email: string,
    ){
        this.ruc = ruc;
        this.nombreApellido = nombreApellido;
        this.email = email;
    }
}