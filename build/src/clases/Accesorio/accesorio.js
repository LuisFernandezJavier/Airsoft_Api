"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accesorio = void 0;
class Accesorio {
    constructor(codArma, nombre, tipoAccesorio, precio) {
        this._codArma = codArma,
            this._nombre = nombre,
            this._tipoAccesorio = tipoAccesorio,
            this._precio = precio;
    }
    get codArma() {
        return this._codArma;
    }
    get nombre() {
        return this._nombre;
    }
    get tipoAccesorio() {
        return this._tipoAccesorio;
    }
    get precio() {
        return this._precio;
    }
}
exports.Accesorio = Accesorio;
