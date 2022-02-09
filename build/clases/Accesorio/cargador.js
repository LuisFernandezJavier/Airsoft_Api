"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargador = void 0;
const accesorio_1 = require("./accesorio");
class Cargador extends accesorio_1.Accesorio {
    constructor(codArma, nombre, tipoAccesorio, precio, numeroBalas) {
        super(codArma, nombre, tipoAccesorio, precio);
        this._numeroBalas = numeroBalas;
    }
    get numeroBalas() {
        return this._numeroBalas;
    }
}
exports.Cargador = Cargador;
