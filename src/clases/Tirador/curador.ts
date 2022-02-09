import { Tirador } from '../Tirador/tirador'

export class Curador extends Tirador {
    private _revivido: number;
    constructor(codArma: string,
        codEquipo: string,
        nombre: string,
        rolTirador: string,
        bajas: number,
        muertes: number,
        fechaInscripcion: Date,
        revivido: number
    ) {
        super(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion)
        this._revivido = revivido;
    }
    get revivido() {
        return this._revivido
    }
}