import { Tirador } from "../Tirador/tirador";

export class Equipo {
    private _codEquipo: string;
    private _nombreEquipo: string;
    private _creacionEquipo: Date;
    private _miembros: Array<Tirador>;
    constructor(codEquipo: string, nombreEquipo: string, creacionEquipo: Date) {
        this._codEquipo = codEquipo;
        this._nombreEquipo = nombreEquipo;
        this._creacionEquipo = creacionEquipo;
        this._miembros = new Array<Tirador>();
    }
    get codEquipo() {
        return this._codEquipo;
    }
    get nombreEquipo() {
        return this._nombreEquipo;
    }
    get creacionEquipo(){
        return this._creacionEquipo;
    }
    get miembros() {
        return this._miembros;
    }
}