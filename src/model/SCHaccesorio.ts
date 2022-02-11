import {Schema, model } from 'mongoose';

const accesorioSchema = new Schema({
    _codArma: {
        type: String
    },
    _idAccesorio:{
        type: String
    },
    _nombre:{
        type: String
    },
    _tipoAccesorio: {
        type: String
    },
    _precio: {
        type: Number
    },
    _longitudCanon:{
        type: Number
    },
    _numeroBalas:{
        type: Number
    },
    _zoom:{
        type: Number
    },
    _tipoMirilla:{
        type: String
    }
})

export type iAccesorio = {
    _codArma: string ,
    _idAccesorio: string ,
    _nombre: string ,
    _tipoAccesorio: string ,
    _precio: number ,
}

export const SAccesorio = model('accesorios', accesorioSchema) 