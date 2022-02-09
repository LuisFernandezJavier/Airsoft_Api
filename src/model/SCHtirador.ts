import { Schema, model } from 'mongoose';

export const tiradorSchema = new Schema({
    _codArma: {
        type: String
    },
    _codEquipo: {
        type: String
    },
    _nombre: {
        type: String
    },
    _rolTirador:{
        type: String
    },
    _bajas: {
        type: Number
    },
    _muertes: {
        type: Number
    },
    _fechaInscripcion: {
        type: Date
    },
    _revivido: {
        type: Number
    },
    _explosivoDetonado: {
        type: Number
    }
})



export const STirador = model('tiradores', tiradorSchema) 

