"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cañon = void 0;
const accesorio_1 = require("./accesorio");
class Cañon extends accesorio_1.Accesorio {
    constructor(codArma, nombre, tipoAccesorio, precio, longitudCañon) {
        super(codArma, nombre, tipoAccesorio, precio);
        this._longitudCañon = longitudCañon;
    }
    get longitudCañon() {
        return this._longitudCañon;
    }
}
exports.Cañon = Cañon;
