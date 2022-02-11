
export class Accesorio {
    protected _codArma: string;
    protected _idAccesorio: string;
    protected _nombre: string;
    protected _tipoAccesorio: string;
    protected _precio: number
    constructor(codArma: string,
        idAccesorio:string,
        nombre: string,
        tipoAccesorio: string,
        precio: number
    ) {
            this._codArma = codArma,
            this._idAccesorio = idAccesorio,
            this._nombre = nombre,
            this._tipoAccesorio = tipoAccesorio,
            this._precio = precio
    }

    public get codArma() {
        return this._codArma
    }
    public get nombre() {
        return this._nombre
    }
    public get tipoAccesorio() {
        return this._tipoAccesorio
    }
    public get precio() {
        return this._precio
    }

    

    setPrecioF (): number{
        let precioF : number;
        precioF = this._precio + 20;
        return precioF;
    }
}