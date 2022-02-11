"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAccesorio = void 0;
const mongoose_1 = require("mongoose");
const accesorioSchema = new mongoose_1.Schema({
    _codArma: {
        type: String
    },
    _idAccesorio: {
        type: String
    },
    _nombre: {
        type: String
    },
    _tipoAccesorio: {
        type: String
    },
    _precio: {
        type: Number
    },
    _longitudCanon: {
        type: Number
    },
    _numeroBalas: {
        type: Number
    },
    _zoom: {
        type: Number
    },
    _tipoMirilla: {
        type: String
    }
});
exports.SAccesorio = (0, mongoose_1.model)('accesorios', accesorioSchema);
