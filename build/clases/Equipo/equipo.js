"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipo = void 0;
class Equipo {
    constructor(codEquipo, nombreEquipo) {
        this._codEquipo = codEquipo;
        this._nombreEquipo = nombreEquipo;
        this._miembros = new Array();
    }
    get codEquipo() {
        return this._codEquipo;
    }
    get nombreEquipo() {
        return this._nombreEquipo;
    }
    get miembros() {
        return this._miembros;
    }
}
exports.Equipo = Equipo;
