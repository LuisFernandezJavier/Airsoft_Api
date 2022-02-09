"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const database_1 = require("../database/database");
const SCHarmamento_1 = require("../model/SCHarmamento");
class DatoRoutes {
    constructor() {
        this.listoArmas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHarmamento_1.SArma.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.newArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let objArma = new SCHarmamento_1.SArma({
                codArma: req.params.codArma,
                nombreArma: req.params.nombreArma,
                fechaProduccion: req.params.fechaProduccion,
                precioBase: req.params.precioBase,
                disparoAutomatico: req.params.disparoAutomatico,
                categoriaArma: req.params.categoriaArma,
                animaRayada: req.params.animaRayada,
                calibre: req.params.calibre,
            });
            console.log(objArma);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield objArma.save();
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/listaArmas', this.listoArmas);
        this._router.post('/nuevaArma', this.newArma);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
