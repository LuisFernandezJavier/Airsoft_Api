import { Accesorio } from './accesorio'

export class Mirilla extends Accesorio {
    private _zoom: number;
    private _tipoMirilla: string;
    constructor(codArma: string,
        nombre: string,
        tipoAccesorio: string,
        precio: number,
        zoom: number,
        tipoMirilla: string
    ) {
        super(codArma, nombre, tipoAccesorio, precio)
        this._zoom = zoom;
        this._tipoMirilla = tipoMirilla
    }
    get zoom() {
        return this._zoom
    }
    get tipoMirilla() {
        return this._tipoMirilla
    }
}