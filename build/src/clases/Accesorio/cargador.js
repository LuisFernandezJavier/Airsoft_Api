"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargador = void 0;
const accesorio_1 = require("./accesorio");
class Cargador extends accesorio_1.Accesorio {
    constructor(codArma, idAccesorio, nombre, tipoAccesorio, precio, numeroBalas) {
        super(codArma, idAccesorio, nombre, tipoAccesorio, precio);
        this._numeroBalas = numeroBalas;
    }
    get numeroBalas() {
        return this._numeroBalas;
    }
    setPrecioF() {
        let precioF;
        precioF = super.setPrecioF();
        if (this._numeroBalas > 30) {
            precioF = (0.15 * precioF) + precioF;
        }
        else if (this._numeroBalas > 60) {
            precioF = (0.25 * precioF) + precioF;
        }
        return precioF;
    }
}
exports.Cargador = Cargador;
