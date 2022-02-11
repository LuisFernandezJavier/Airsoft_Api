"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mirilla = void 0;
const accesorio_1 = require("./accesorio");
class Mirilla extends accesorio_1.Accesorio {
    constructor(codArma, idAccesorio, nombre, tipoAccesorio, precio, zoom, tipoMirilla) {
        super(codArma, idAccesorio, nombre, tipoAccesorio, precio);
        this._zoom = zoom;
        this._tipoMirilla = tipoMirilla;
    }
    get zoom() {
        return this._zoom;
    }
    get tipoMirilla() {
        return this._tipoMirilla;
    }
    setPrecioF() {
        let precioF;
        precioF = super.setPrecioF();
        if (this._zoom > 2) {
            precioF = (0.20 * precioF) + precioF;
        }
        else if (this._zoom > 12) {
            precioF = (0.45 * precioF) + precioF;
        }
        if (this._tipoMirilla == 'Digital') {
            precioF = (0.15 * precioF) + precioF;
        }
        return precioF;
    }
}
exports.Mirilla = Mirilla;
