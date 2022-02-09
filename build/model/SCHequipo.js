"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEquipo = exports.equipoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.equipoSchema = new mongoose_1.Schema({
    _codEquipo: {
        type: String
    },
    _nombreEquipo: {
        type: String
    },
});
exports.SEquipo = (0, mongoose_1.model)('equipos', exports.equipoSchema);
