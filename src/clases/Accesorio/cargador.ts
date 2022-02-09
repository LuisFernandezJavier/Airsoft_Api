import { Accesorio } from './accesorio'

export class Cargador extends Accesorio {
    private _numeroBalas: number;
    constructor(codArma: string,
        nombre: string,
        tipoAccesorio: string,
        precio: number,
        numeroBalas: number
    ) {
        super(codArma, nombre, tipoAccesorio, precio)
        this._numeroBalas = numeroBalas
    }
    get numeroBalas() {
        return this._numeroBalas
    }
}