"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arma = void 0;
class Arma {
    constructor(codArma, nombreArma, fechaProduccion, precioBase, disparoAutomatico, categoriaArma, animaRayada, calibre) {
        this._codArma = codArma;
        this._nombreArma = nombreArma;
        this._fechaProduccion = fechaProduccion;
        this._precioBase = precioBase;
        this._calibre = calibre;
        this._disparoAutomatico = disparoAutomatico;
        this._categoriaArma = categoriaArma;
        this._animaRayada = animaRayada;
        this._calibre = calibre;
        this._accesorio = new Array();
    }
    get codArma() {
        return this._codArma;
    }
    get nombreArma() {
        return this._nombreArma;
    }
    get fechaProduccion() {
        return this._fechaProduccion;
    }
    get precioBase() {
        return this._precioBase;
    }
    get calibre() {
        return this._calibre;
    }
    get disparoAutomatico() {
        return this._disparoAutomatico;
    }
    get categoriaArma() {
        return this._categoriaArma;
    }
    get animaRayada() {
        return this._animaRayada;
    }
    get accesorio() {
        return this._accesorio;
    }
    addAccesorio(accesorio) {
        this._accesorio.push(accesorio);
    }
    valorF() {
        let hoy = new Date();
        let añosA = hoy.getFullYear() - this._fechaProduccion.getFullYear();
        if (añosA > 2) {
            this._precioBase = this._precioBase - (this._precioBase * 0.25);
        }
        else if (añosA > 5 && añosA < 10) {
            this._precioBase = this._precioBase - (this._precioBase * 0.35);
        }
        else if (añosA > 10) {
            this._precioBase = this._precioBase - (this._precioBase * 0.40);
        }
        if (this._calibre > 0.8) {
            this._precioBase = this._precioBase + 20;
        }
        if (this._animaRayada == true) {
            this._precioBase = this._precioBase + 150;
        }
        if (this._disparoAutomatico == true) {
            this._precioBase = this._precioBase + 150;
        }
        return this._precioBase;
    }
}
exports.Arma = Arma;
