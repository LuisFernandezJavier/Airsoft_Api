"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cañon = void 0;
const accesorio_1 = require("./accesorio");
class Cañon extends accesorio_1.Accesorio {
    constructor(codArma, nombre, idAccesorio, tipoAccesorio, precio, longitudCanon) {
        super(codArma, idAccesorio, nombre, tipoAccesorio, precio);
        this._longitudCanon = longitudCanon;
    }
    get longitudCañon() {
        return this._longitudCanon;
    }
    setPrecioF() {
        let precioF;
        precioF = super.setPrecioF();
        if (this._longitudCanon > 8) {
            precioF = (0.25 * precioF) + precioF;
        }
        else if (this._longitudCanon > 20) {
            precioF = (0.40 * precioF) + precioF;
        }
        return precioF;
    }
}
exports.Cañon = Cañon;
