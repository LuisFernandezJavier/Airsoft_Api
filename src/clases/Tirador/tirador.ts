import { Arma } from '../Armamento/arma';

export class Tirador {
    protected _codArma: string;
    protected _codEquipo: string;
    protected _nombre: string;
    protected _rolTirador: string;
    protected _bajas: number;
    protected _muertes: number;
    protected _fechaInscripcion: Date;
    constructor(codArma: string,
        codEquipo: string,
        nombre: string,
        rolTirador: string,
        bajas: number,
        muertes: number,
        fechaInscripcion: Date
    ) {
        this._codArma = codArma;
        this._codEquipo = codEquipo;
        this._nombre = nombre;
        this._rolTirador = rolTirador;
        this._bajas = bajas;
        this._muertes = muertes;
        this._fechaInscripcion = fechaInscripcion;
    }
    get codArma() {
        return this._codArma;
    }
    get codEquipo() {
        return this._codEquipo;
    }
    get nombre() {
        return this._nombre;
    }
    get rolTirador() {
        return this._rolTirador
    }
    get bajas() {
        return this._bajas;
    }
    get muertes() {
        return this._muertes;
    }
    get fechaInscripcion() {
        return this._fechaInscripcion;
    }
}