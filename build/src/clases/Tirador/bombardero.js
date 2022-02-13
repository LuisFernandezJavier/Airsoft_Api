"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bombardero = void 0;
const tirador_1 = require("../Tirador/tirador");
class Bombardero extends tirador_1.Tirador {
    constructor(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion, explosivoDetonado) {
        super(codArma, codEquipo, nombre, rolTirador, bajas, muertes, fechaInscripcion);
        this._explosivoDetonado = explosivoDetonado;
    }
    get explosivoDetonado() {
        return this._explosivoDetonado;
    }
    KDA() {
        let media;
        media = super.KDA();
        media = media + (this._explosivoDetonado / this._muertes);
        return media;
    }
}
exports.Bombardero = Bombardero;
