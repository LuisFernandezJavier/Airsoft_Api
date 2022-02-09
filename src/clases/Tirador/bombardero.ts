import { Tirador } from '../Tirador/tirador'

export class Bombardero extends Tirador {
    private _explosivoDetonado: number;
    constructor(codArma: string,
        codEquipo: string,
        nombre: string,
        rolTirador: string,
        bajas: number,
        muertes: number,
        fechaInscripcion: Date,
        explosivoDetonado: number
    ) {
        super(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion)
        this._explosivoDetonado = explosivoDetonado;
    }
    get explosivoDetonado() {
        return this._explosivoDetonado
    }
}