import { Accesorio } from './accesorio'

export class Cañon extends Accesorio {
    private _longitudCanon: number;
    constructor(codArma: string,
        nombre: string,
        idAccesorio:string,
        tipoAccesorio: string,
        precio: number,
        longitudCanon: number
    ) {
        super(codArma,idAccesorio, nombre, tipoAccesorio, precio)
        this._longitudCanon = longitudCanon
    }
    get longitudCañon() {
        return this._longitudCanon
    }

    setPrecioF(): number {
        let precioF: number;
        precioF = super.setPrecioF();
        if (this._longitudCanon > 8) {
            precioF = (0.25 * precioF) + precioF;
        } else if (this._longitudCanon > 20) {
            precioF = (0.40 * precioF) + precioF;
        }
        return precioF;
    }
}