import { Accesorio } from './accesorio'

export class Mirilla extends Accesorio {
    private _zoom: number;
    private _tipoMirilla: string;
    constructor(codArma: string,
        idAccesorio:string,
        nombre: string,
        tipoAccesorio: string,
        precio: number,
        zoom: number,
        tipoMirilla: string
    ) {
        super(codArma,idAccesorio, nombre, tipoAccesorio, precio)
        this._zoom = zoom;
        this._tipoMirilla = tipoMirilla
    }
    get zoom() {
        return this._zoom
    }
    get tipoMirilla() {
        return this._tipoMirilla
    }

    setPrecioF(): number {
        let precioF: number;
        precioF = super.setPrecioF();
        if (this._zoom > 2) {
            precioF = (0.20 * precioF) + precioF;
        } else if (this._zoom > 12) {
            precioF = (0.45 * precioF) + precioF;
        }

        if (this._tipoMirilla == 'Digital'){
            precioF = (0.15 * precioF) + precioF;
        }

        return precioF;
    }
}
