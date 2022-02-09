"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mirilla = void 0;
const accesorio_1 = require("./accesorio");
class Mirilla extends accesorio_1.Accesorio {
    constructor(codArma, nombre, tipoAccesorio, precio, zoom, tipoMirilla) {
        super(codArma, nombre, tipoAccesorio, precio);
        this._zoom = zoom;
        this._tipoMirilla = tipoMirilla;
    }
    get zoom() {
        return this._zoom;
    }
    get tipoMirilla() {
        return this._tipoMirilla;
    }
}
exports.Mirilla = Mirilla;
