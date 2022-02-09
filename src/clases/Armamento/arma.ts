import { Accesorio } from '../Accesorio/accesorio'

export class Arma {
    protected _codArma: string;
    protected _nombreArma: string;
    protected _fechaProduccion: Date;
    protected _precioBase: number;
    private _disparoAutomatico: boolean;
    private _categoriaArma: string;
    private _animaRayada: boolean;
    protected _calibre: number;
    protected _accesorio: Array<Accesorio>;
    constructor(codArma: string,
        nombreArma: string,
        fechaProduccion: Date,
        precioBase: number,
        disparoAutomatico: boolean,
        categoriaArma: string,
        animaRayada: boolean,
        calibre: number
    ) {

        this._codArma = codArma;
        this._nombreArma = nombreArma;
        this._fechaProduccion = fechaProduccion;
        this._precioBase = precioBase;
        this._calibre = calibre;
        this._disparoAutomatico = disparoAutomatico;
        this._categoriaArma = categoriaArma;
        this._animaRayada = animaRayada;
        this._calibre = calibre;
        this._accesorio = new Array<Accesorio>();
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
    get accesorio(): Array<Accesorio> {
        return this._accesorio
    }
}