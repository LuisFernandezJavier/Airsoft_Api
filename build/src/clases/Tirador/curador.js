"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curador = void 0;
const tirador_1 = require("../Tirador/tirador");
class Curador extends tirador_1.Tirador {
    constructor(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion, revivido) {
        super(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion);
        this._revivido = revivido;
    }
    get revivido() {
        return this._revivido;
    }
    KDA() {
        let media;
        media = super.KDA();
        media = media + (this._revivido / this._muertes);
        return media;
    }
}
exports.Curador = Curador;
