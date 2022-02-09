"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STirador = exports.tiradorSchema = void 0;
const mongoose_1 = require("mongoose");
exports.tiradorSchema = new mongoose_1.Schema({
    _codArma: {
        type: String
    },
    _codEquipo: {
        type: String
    },
    _nombre: {
        type: String
    },
    _bajas: {
        type: Number
    },
    _muertes: {
        type: Number
    },
    _fechaInscripcion: {
        type: Date
    },
    _revivido: {
        type: Number
    },
    _explosivoDetonado: {
        type: Number
    }
});
exports.STirador = (0, mongoose_1.model)('tiradores', exports.tiradorSchema);
