import { Accesorio } from './accesorio'

export class Cañon extends Accesorio {
    private _longitudCañon: number;
    constructor(codArma: string,
        nombre: string,
        tipoAccesorio: string,
        precio: number,
        longitudCañon: number
    ) {
        super(codArma, nombre, tipoAccesorio, precio)
        this._longitudCañon = longitudCañon
    }
    get longitudCañon() {
        return this._longitudCañon
    }
}