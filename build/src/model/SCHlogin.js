"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLogin = exports.loginSchema = void 0;
const mongoose_1 = require("mongoose");
exports.loginSchema = new mongoose_1.Schema({
    _codLogin: {
        type: String
    },
    _pass: {
        type: String
    },
    _usuario: {
        type: String
    }
});
exports.SLogin = (0, mongoose_1.model)('loginuser', exports.loginSchema);
