
export class Accesorio {
    protected _codArma: string;
    protected _nombre: string;
    protected _tipoAccesorio: string;
    protected _precio: number
    constructor(codArma: string,
        nombre: string,
        tipoAccesorio: string,
        precio: number
    ) {
            this._codArma = codArma,
            this._nombre = nombre,
            this._tipoAccesorio = tipoAccesorio,
            this._precio = precio
    }

    get codArma() {
        return this._codArma
    }
    get nombre() {
        return this._nombre
    }
    get tipoAccesorio() {
        return this._tipoAccesorio
    }
    get precio() {
        return this._precio
    }
}