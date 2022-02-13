"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipo = void 0;
class Equipo {
    constructor(codEquipo, nombreEquipo, creacionEquipo) {
        this._codEquipo = codEquipo;
        this._nombreEquipo = nombreEquipo;
        this._creacionEquipo = creacionEquipo;
        this._miembros = new Array();
    }
    get codEquipo() {
        return this._codEquipo;
    }
    get nombreEquipo() {
        return this._nombreEquipo;
    }
    get creacionEquipo() {
        return this._creacionEquipo;
    }
    get miembros() {
        return this._miembros;
    }
    addTirador(tirador) {
        this._miembros.push(tirador);
    }
}
exports.Equipo = Equipo;
