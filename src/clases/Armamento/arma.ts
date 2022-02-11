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
        calibre: number,
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
    public get codArma() {
        return this._codArma;
    }
    public get nombreArma() {
        return this._nombreArma;
    }
    public get fechaProduccion() {
        return this._fechaProduccion;
    }
    public get precioBase() {
        return this._precioBase;
    }
    public get calibre() {
        return this._calibre;
    }
    public get disparoAutomatico() {
        return this._disparoAutomatico;
    }
    public get categoriaArma() {
        return this._categoriaArma;
    }
    public get animaRayada() {
        return this._animaRayada;
    }
    public get accesorio(): Array<Accesorio> {
        return this._accesorio
    }

    public addAccesorio(accesorio: Accesorio) {
        this._accesorio.push(accesorio);
    }

    valorF() {
        let hoy = new Date();
        
        let añosA = hoy.getFullYear() - this._fechaProduccion.getFullYear();
        
        if (añosA > 2) {
            this._precioBase = this._precioBase - (this._precioBase * 0.25)
        } else if (añosA > 5 && añosA < 10) {
            this._precioBase = this._precioBase - (this._precioBase * 0.35)
        } else if (añosA > 10) {
            this._precioBase = this._precioBase - (this._precioBase * 0.40)
        }
        if (this._calibre > 0.8) {
            this._precioBase = this._precioBase + 20
        }
        if (this._animaRayada == true){
            this._precioBase = this._precioBase + 150
        }
        if (this._disparoAutomatico == true){
            this._precioBase = this._precioBase + 150
        }
        return this._precioBase
    }
}