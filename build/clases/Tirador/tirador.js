"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tirador = void 0;
class Tirador {
    constructor(codArma, codEquipo, nombre, bajas, muertes, fechaInscripcion) {
        this._codArma = codArma;
        this._codEquipo = codEquipo;
        this._nombre = nombre;
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
exports.Tirador = Tirador;
