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
const SCHequipo_1 = require("../model/SCHequipo");
const SCHaccesorio_1 = require("../model/SCHaccesorio");
const SCHtirador_1 = require("../model/SCHtirador");
const arma_1 = require("../clases/Armamento/arma");
const accesorio_1 = require("../clases/Accesorio/accesorio");
const tirador_1 = require("../clases/Tirador/tirador");
const curador_1 = require("../clases/Tirador/curador");
const bombardero_1 = require("../clases/Tirador/bombardero");
const cargador_1 = require("../clases/Accesorio/cargador");
const ca_on_1 = require("../clases/Accesorio/ca\u00F1on");
const mirilla_1 = require("../clases/Accesorio/mirilla");
class DatoRoutes {
    constructor() {
        // funciones basicas para las armas
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
            const arma = new SCHarmamento_1.SArma(req.body);
            console.log(arma);
            let objArma = new SCHarmamento_1.SArma({
                _codArma: arma._codArma,
                _nombreArma: arma._nombreArma,
                _fechaProduccion: arma._fechaProduccion,
                _precioBase: arma._precioBase,
                _disparoAutomatico: arma._disparoAutomatico,
                _categoriaArma: arma._categoriaArma,
                _animaRayada: arma._animaRayada,
                _calibre: arma._calibre,
            });
            console.log(objArma);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield objArma.save()
                    .then((mensaje) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.obtengoArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHarmamento_1.SArma.aggregate([
                    {
                        $match: { "_codArma": cod }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.modificoArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const cod = req.params.cod;
                const modarma = (req.body);
                yield SCHarmamento_1.SArma.findOneAndUpdate({ _codArma: cod }, {
                    _codArma: modarma._codArma,
                    _nombreArma: modarma._nombreArma,
                    _fechaProduccion: modarma._fechaProduccion,
                    _precioBase: modarma._precioBase,
                    _disparoAutomatico: modarma._disparoAutomatico,
                    _categoriaArma: modarma._categoriaArma,
                    _animaRayada: modarma._animaRayada,
                    _calibre: modarma._calibre,
                }, { new: true })
                    .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                    .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.borroArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD();
            yield SCHarmamento_1.SArma.findOneAndDelete({
                "_codArma": cod
            })
                .then((doc) => res.send("Documento borrado " + doc))
                .catch((error) => res.send('Error:  ' + error));
            yield database_1.db.desconectarBD();
        });
        // funcines basicas para tiradores
        this.listoTiradores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHtirador_1.STirador.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.newTirador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tirador = new SCHtirador_1.STirador(req.body);
            let objTirador;
            console.log(tirador._rolTirador);
            if (tirador._rolTirador == 'Curador') {
                console.log("elijo curador");
                objTirador = new SCHtirador_1.STirador({
                    _codArma: tirador._codArma,
                    _codEquipo: tirador._codEquipo,
                    _nombre: tirador._nombre,
                    _rolTirador: tirador._rolTirador,
                    _bajas: tirador._bajas,
                    _muertes: tirador._muertes,
                    _fechaInscripcion: tirador._fechaInscripcion,
                    _revivido: tirador._revivido
                });
            }
            else if (tirador._rolTirador == 'Bombardero') {
                console.log('tiro muchas bombas');
                objTirador = new SCHtirador_1.STirador({
                    _codArma: tirador._codArma,
                    _codEquipo: tirador._codEquipo,
                    _nombre: tirador._nombre,
                    _rolTirador: tirador._rolTirador,
                    _bajas: tirador._bajas,
                    _muertes: tirador._muertes,
                    _fechaInscripcion: tirador._fechaInscripcion,
                    _explosivoDetonado: tirador._explosivoDetonado
                });
            }
            else {
                console.log('solo disparo');
                objTirador = new SCHtirador_1.STirador({
                    _codArma: tirador._codArma,
                    _codEquipo: tirador._codEquipo,
                    _nombre: tirador._nombre,
                    _rolTirador: tirador.rolTirador,
                    _bajas: tirador._bajas,
                    _muertes: tirador._muertes,
                    _fechaInscripcion: tirador._fechaInscripcion
                });
            }
            console.log(objTirador);
            console.log('lo que llega', tirador);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield objTirador.save()
                    .then((mensaje) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.obtengoTirador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHtirador_1.STirador.find({ _codArma: cod });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.modificoTirador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const cod = req.params.cod;
                const modtirador = (req.body);
                if (modtirador._rolTirador == 'Curador') {
                    console.log("elijo curador");
                    yield SCHtirador_1.STirador.findOneAndUpdate({ _codArma: cod }, {
                        _codArma: modtirador._codArma,
                        _codEquipo: modtirador._codEquipo,
                        _nombre: modtirador._nombre,
                        _rolTirador: modtirador._rolTirador,
                        _bajas: modtirador._bajas,
                        _muertes: modtirador._muertes,
                        _fechaInscripcion: modtirador._fechaInscripcion,
                        _revivido: modtirador._revivido
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
                else if (modtirador._rolTirador == 'Bombardero') {
                    console.log("elijo bombardero");
                    yield SCHtirador_1.STirador.findOneAndUpdate({ _codArma: cod }, {
                        _codArma: modtirador._codArma,
                        _codEquipo: modtirador._codEquipo,
                        _nombre: modtirador._nombre,
                        _rolTirador: modtirador._rolTirador,
                        _bajas: modtirador._bajas,
                        _muertes: modtirador._muertes,
                        _fechaInscripcion: modtirador._fechaInscripcion,
                        _explosivoDetonado: modtirador._explosivoDetonado
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
                else {
                    console.log("solo disparo");
                    yield SCHtirador_1.STirador.findOneAndUpdate({ _codArma: cod }, {
                        _codArma: modtirador._codArma,
                        _codEquipo: modtirador._codEquipo,
                        _nombre: modtirador._nombre,
                        _rolTirador: modtirador._rolTirador,
                        _bajas: modtirador._bajas,
                        _muertes: modtirador._muertes,
                        _fechaInscripcion: modtirador._fechaInscripcion,
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.borroTirador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD();
            yield SCHtirador_1.STirador.findOneAndDelete({
                "_codArma": cod
            })
                .then((doc) => res.send("Documento borrado " + doc))
                .catch((error) => res.send('Error:  ' + error));
            yield database_1.db.desconectarBD();
        });
        // funciones basicas para los equipos
        this.listoEquipos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHtirador_1.STirador.find({ _codEquipo: cod });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.obtengoEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHequipo_1.SEquipo.aggregate([
                    {
                        $match: { "_codEquipo": cod }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.newEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const equipo = new SCHequipo_1.SEquipo(req.body);
            console.log(equipo);
            let objEquipo = new SCHequipo_1.SEquipo({
                _codEquipo: equipo._codEquipo,
                _nombreEquipo: equipo._nombreEquipo,
                _creacionEquipo: equipo._creacionEquipo
            });
            console.log(objEquipo);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield objEquipo.save()
                    .then((mensaje) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.modificoEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            {
                yield database_1.db.conectarBD()
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    const cod = req.params.cod;
                    const modequipo = (req.body);
                    yield SCHarmamento_1.SArma.findOneAndUpdate({ _codArma: cod }, {
                        _codEquipo: modequipo._codEquipo,
                        _nombreEquipo: modequipo._nombreEquipo,
                        _creacionEquipo: modequipo._creacionEquipo
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }))
                    .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
                database_1.db.desconectarBD();
            }
        });
        this.borroEquipo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD();
            yield SCHarmamento_1.SArma.findOneAndDelete({
                "_codEquipo": cod
            })
                .then((doc) => res.send("Documento borrado " + doc))
                .catch((error) => res.send('Error:  ' + error));
            yield database_1.db.desconectarBD();
        });
        //FUNCIONES BASICAS ACCESORIOS
        this.listoAccesorios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHaccesorio_1.SAccesorio.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.obtengoAccesorio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHaccesorio_1.SAccesorio.find({ _idAccesorio: cod });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.obtengoAccesorioCodArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield SCHaccesorio_1.SAccesorio.find({ _codArma: cod });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.newAccesorio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const accesorio = new SCHaccesorio_1.SAccesorio(req.body);
            let objAccesorio;
            console.log(accesorio._tipoAccesorio);
            if (accesorio._tipoAccesorio == 'Cargador') {
                console.log("elijo cargador");
                objAccesorio = new SCHaccesorio_1.SAccesorio({
                    _codArma: accesorio._codArma,
                    _idAccesorio: accesorio._idAccesorio,
                    _nombre: accesorio._nombre,
                    _tipoAccesorio: accesorio._tipoAccesorio,
                    _precio: accesorio._precio,
                    _numeroBalas: accesorio._numeroBalas
                });
            }
            else if (accesorio._tipoAccesorio == 'Cañon') {
                console.log('elijo cañon');
                objAccesorio = new SCHaccesorio_1.SAccesorio({
                    _codArma: accesorio._codArma,
                    _idAccesorio: accesorio._idAccesorio,
                    _nombre: accesorio._nombre,
                    _tipoAccesorio: accesorio._tipoAccesorio,
                    _precio: accesorio._precio,
                    _longitudCanon: accesorio._longitudCanon
                });
            }
            else {
                console.log('elijo mirilla');
                objAccesorio = new SCHaccesorio_1.SAccesorio({
                    _codArma: accesorio._codArma,
                    _idAccesorio: accesorio._idAccesorio,
                    _nombre: accesorio._nombre,
                    _tipoAccesorio: accesorio._tipoAccesorio,
                    _precio: accesorio._precio,
                    _zoom: accesorio._zoom,
                    _tipoMirilla: accesorio._tipoMirilla,
                });
            }
            console.log(objAccesorio);
            console.log('lo que llega', accesorio);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield objAccesorio.save()
                    .then((mensaje) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.modificoAccesorio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const cod = req.params.cod;
                const modaccesorio = (req.body);
                if (modaccesorio._tipoAccesorio == 'Cargador') {
                    console.log("elijo cargador");
                    yield SCHaccesorio_1.SAccesorio.findOneAndUpdate({ _codArma: cod }, {
                        _codArma: modaccesorio._codArma,
                        _idAccesorio: modaccesorio._idAccesorio,
                        _nombre: modaccesorio._nombre,
                        _tipoAccesorio: modaccesorio._tipoAccesorio,
                        _precio: modaccesorio._precio,
                        _numeroBalas: modaccesorio._numeroBalas
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
                else if (modaccesorio._tipoAccesorio == 'Cañon') {
                    console.log("elijo bombardero");
                    yield SCHaccesorio_1.SAccesorio.findOneAndUpdate({ _codArma: cod }, {
                        _codArma: modaccesorio._codArma,
                        _idAccesorio: modaccesorio._idAccesorio,
                        _nombre: modaccesorio._nombre,
                        _tipoAccesorio: modaccesorio._tipoAccesorio,
                        _precio: modaccesorio._precio,
                        _longitudCañon: modaccesorio._longitudCañon
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
                else {
                    console.log("solo disparo");
                    yield SCHaccesorio_1.SAccesorio.findOneAndUpdate({ _idAccesorio: cod }, {
                        _codArma: modaccesorio._codArma,
                        _idAccesorio: modaccesorio._idAccesorio,
                        _nombre: modaccesorio._nombre,
                        _tipoAccesorio: modaccesorio._tipoAccesorio,
                        _precio: modaccesorio._precio,
                        _zoom: modaccesorio._zoom,
                        _tipoMirilla: modaccesorio._tipoMirilla
                    }, { new: true })
                        .then((mensaje) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error) => res.send(`Error en la subida del documento a ${database_1.db}: ${error}`));
                }
            }))
                .catch((error) => res.send(`Error conectando a ${database_1.db}: ${error}`));
            database_1.db.desconectarBD();
        });
        this.borroAccesorio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD();
            yield SCHaccesorio_1.SAccesorio.findOneAndDelete({
                "_codArma": cod
            })
                .then((doc) => res.send("Documento borrado " + doc))
                .catch((error) => res.send('Error:  ' + error));
            yield database_1.db.desconectarBD();
        });
        // FUNCIONES CON CALCULOS
        this.valorArma = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                let tmpAccesorio = new accesorio_1.Accesorio("", "", "", "", 0);
                let armaMontada = new arma_1.Arma("", "", new Date, 0, false, "", false, 0);
                let dArma;
                let dAccesorio;
                let query2 = yield SCHaccesorio_1.SAccesorio.find({ _codArma: cod });
                let query = yield SCHarmamento_1.SArma.find({ _codArma: cod });
                for (dArma of query) {
                    armaMontada = new arma_1.Arma(dArma._codArma, dArma._nombreArma, dArma._fechaProduccion, dArma._precioBase, dArma._disparoAutomatico, dArma._categoriaArma, dArma._animaRayada, dArma._calibre);
                }
                let valorAr = armaMontada.valorF();
                let valorAc = 0;
                let valorAc2 = 0;
                //let arrayA = []
                for (dAccesorio of query2) {
                    tmpAccesorio = new accesorio_1.Accesorio(dAccesorio._codArma, dAccesorio._idAccesorio, dAccesorio._nombre, dAccesorio._tipoAccesorio, dAccesorio._precio);
                    valorAc = tmpAccesorio.setPrecioF();
                    valorAc2 += valorAc;
                }
                //console.log(valorAr);
                console.log(valorAc2);
                let valorT = valorAc2 + valorAr;
                console.log(valorAr);
                res.json(valorT);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.KDATirador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                let objeto;
                let dTirador;
                let dCurador;
                let dBombardero;
                const query = yield SCHtirador_1.STirador.find({ _codArma: cod });
                if (query[0]._rolTirador == "Tirador") {
                    for (dTirador of query) {
                        objeto = new tirador_1.Tirador(dTirador._codArma, dTirador._codEquipo, dTirador._nombre, dTirador._rolTirador, dTirador._bajas, dTirador._muertes, dTirador._fechaInscripcion);
                    }
                }
                else if (query[0]._rolTirador == "Curador") {
                    for (dCurador of query) {
                        objeto = new curador_1.Curador(dCurador._codArma, dCurador._codEquipo, dCurador._nombre, dCurador._rolTirador, dCurador._bajas, dCurador._muertes, dCurador._fechaInscripcion, dCurador._revivido);
                    }
                }
                else {
                    for (dBombardero of query) {
                        objeto = new bombardero_1.Bombardero(dBombardero._codArma, dBombardero._codEquipo, dBombardero._nombre, dBombardero._rolTirador, dBombardero._bajas, dBombardero._muertes, dBombardero._fechaInscripcion, dBombardero._explosivoDetonado);
                    }
                }
                console.log(objeto._bajas);
                console.log(objeto._muertes);
                console.log("SOY", query[0]._rolTirador);
                console.log("revivo", objeto._revivido);
                console.log(objeto.KDA());
                res.json(objeto.KDA());
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.KDAEQUIPO = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                let arrayT = [];
                let dTirador = new tirador_1.Tirador("", "", "", "", 0, 0, new Date());
                const query = yield SCHtirador_1.STirador.find({ _codEquipo: cod });
                console.log(query);
                for (let a of query) {
                    if (a._rolTirador == "Tirador") {
                        dTirador = new tirador_1.Tirador(a._codArma, a._codEquipo, a._nombre, a._rolTirador, a._bajas, a._muertes, a._fechaInscripcion);
                        arrayT.push(dTirador);
                    }
                    else if (a._rolTirador == "Curador") {
                        dTirador = new curador_1.Curador(a._codArma, a._codEquipo, a._nombre, a._rolTirador, a._bajas, a._muertes, a._fechaInscripcion, a._revivido);
                        arrayT.push(dTirador);
                    }
                    else {
                        dTirador = new bombardero_1.Bombardero(a._codArma, a._codEquipo, a._nombre, a._rolTirador, a._bajas, a._muertes, a._fechaInscripcion, a._explosivoDetonado);
                        arrayT.push(dTirador);
                    }
                }
                //recorro los tiradores del equipo y calculo sus kda
                let kdaNom = [];
                let tmpkda = 0;
                arrayT.forEach(element => {
                    tmpkda = element.KDA();
                    let nombre = element.nombre;
                    let codArma = element.codArma;
                    let bajas = element.bajas;
                    let muertes = element.muertes;
                    kdaNom.push({ nombre, tmpkda, codArma, bajas, muertes });
                });
                res.json(kdaNom);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
        });
        this.ArmayAcesorio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cod = req.params.cod;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                let tmpAccesorio = new accesorio_1.Accesorio("", "", "", "", 0);
                let armaMontada = new arma_1.Arma("", "", new Date, 0, false, "", false, 0);
                let dArma;
                let dAccesorio;
                let query2 = yield SCHaccesorio_1.SAccesorio.find({ _codArma: cod });
                let query = yield SCHarmamento_1.SArma.find({ _codArma: cod });
                //creo el objeto ARMA
                for (dArma of query) {
                    armaMontada = new arma_1.Arma(dArma._codArma, dArma._nombreArma, dArma._fechaProduccion, dArma._precioBase, dArma._disparoAutomatico, dArma._categoriaArma, dArma._animaRayada, dArma._calibre);
                }
                //calculo el valor del arma 
                let precioArma = armaMontada.valorF();
                // creo el objeto accesorio (cualquiera de los que exiten)
                let arrayA = [];
                for (dAccesorio of query2) {
                    if (query2._tipoAccesorio == "Cargador") {
                        tmpAccesorio = new cargador_1.Cargador(dAccesorio._codArma, dAccesorio._idAccesorio, dAccesorio._nombre, dAccesorio._tipoAccesorio, dAccesorio._precio, dAccesorio._numeroBalas);
                    }
                    else if (query2._tipoAccesorio == "Cañon") {
                        tmpAccesorio = new ca_on_1.Cañon(dAccesorio._codArma, dAccesorio._idAccesorio, dAccesorio._nombre, dAccesorio._tipoAccesorio, dAccesorio._precio, dAccesorio._longitudCanon);
                    }
                    else {
                        tmpAccesorio = new mirilla_1.Mirilla(dAccesorio._codArma, dAccesorio._idAccesorio, dAccesorio._nombre, dAccesorio._tipoAccesorio, dAccesorio._precio, dAccesorio._zoom, dAccesorio._tipoAccesorio);
                    }
                    arrayA.push(tmpAccesorio);
                }
                // monto los accesorios en el arma 
                arrayA.forEach(element => {
                    armaMontada.addAccesorio(element);
                });
                //recorro el array de accesorios del objeto armamontada y sumo todo sus precios
                let precioAccesorios = 0;
                for (let a of armaMontada.accesorio) {
                    precioAccesorios += a.setPrecioF();
                }
                console.log("precio ac", precioAccesorios);
                console.log(precioArma);
                let valorTotalFinal = (precioAccesorios + precioArma);
                console.log(valorTotalFinal);
                res.json(valorTotalFinal);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        // RUTAS BASICAS ARMAS
        this._router.get('/listaArmas', this.listoArmas);
        this._router.post('/nuevaArma', this.newArma);
        this._router.get('/obtengoArma/:cod', this.obtengoArma);
        this._router.put('/modificoArma/:cod', this.modificoArma);
        this._router.delete('/borroArma/:cod', this.borroArma);
        // RUTAS BASICAS TIRADORRES
        this._router.get('/listaTiradores', this.listoTiradores);
        this._router.post('/nuevoTirador', this.newTirador);
        this._router.get('/obtengoTirador/:cod', this.obtengoTirador);
        this._router.put('/modificoTirador/:cod', this.modificoTirador);
        this._router.delete('/borroTirador/:cod', this.borroTirador);
        // RUTAS BASICAS EQUIPO
        this._router.get('/listaEquipos/:cod', this.listoEquipos);
        this._router.post('/nuevoEquipo', this.newEquipo);
        this._router.get('/obtengoEquipo/:cod', this.obtengoEquipo);
        this._router.put('/modificoEquipo/:cod', this.modificoEquipo);
        this._router.delete('/borroEquipo/:cod', this.borroEquipo);
        // RUTAS BASICAS ACCESORIOS
        this._router.get('/listaAccesorios', this.listoAccesorios);
        this._router.post('/nuevoAccesorio', this.newAccesorio);
        this._router.get('/obtengoAccesorio/:cod', this.obtengoAccesorio);
        this._router.get('/obtengoAccesorioCA/:cod', this.obtengoAccesorioCodArma);
        this._router.put('/modificoAccesorio/:cod', this.modificoAccesorio);
        this._router.delete('/borroAccesorio/:cod', this.borroAccesorio);
        //RUTA CALCULO
        this._router.get('/valorArma/:cod', this.valorArma);
        this._router.get('/KDA/:cod', this.KDATirador);
        this._router.get('/armaMontada/:cod', this.ArmayAcesorio);
        this._router.get('/KDAequipo/:cod', this.KDAEQUIPO);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
