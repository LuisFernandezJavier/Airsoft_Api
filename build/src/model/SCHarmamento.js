"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SArma = void 0;
const mongoose_1 = require("mongoose");
const armaSchema = new mongoose_1.Schema({
    _codArma: {
        type: String
    },
    _nombreArma: {
        type: String
    },
    _fechaProduccion: {
        type: Date
    },
    _precioBase: {
        type: Number
    },
    _disparoAutomatico: {
        type: Boolean
    },
    _categoriaArma: {
        type: String
    },
    _animaRayada: {
        type: Boolean
    },
    _calibre: {
        type: Number
    },
});
exports.SArma = (0, mongoose_1.model)('armas', armaSchema);
