import {Schema, model } from 'mongoose';

const accesorioSchema = new Schema({
    _codArma: {
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
    _longitudCañon:{
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


export const SAccesorio = model('accesorios', accesorioSchema) 