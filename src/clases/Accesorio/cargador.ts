import { Accesorio } from './accesorio'

export class Cargador extends Accesorio {
    private _numeroBalas: number;
    constructor(codArma: string,
        idAccesorio:string,
        nombre: string,
        tipoAccesorio: string,
        precio: number,
        numeroBalas: number
    ) {
        super(codArma,idAccesorio, nombre, tipoAccesorio, precio)
        this._numeroBalas = numeroBalas
    }
    public get numeroBalas() {
        return this._numeroBalas
    }

    setPrecioF(): number {
        let precioF: number;
        precioF = super.setPrecioF();
        if (this._numeroBalas > 30) {
            precioF = (0.15 * precioF) + precioF;
        } else if (this._numeroBalas > 60) {
            precioF = (0.25 * precioF) + precioF;
        }
        return precioF;
    }
}