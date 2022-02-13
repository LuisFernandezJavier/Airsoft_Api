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
    _rolTirador: {
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

export type iTirador = {
    _codArma: string,
    _codEquipo: string,
    _nombre: string,
    _rolTirador: string,
    _bajas: number,
    _muertes: number,
    _fechaInscripcion: Date,
}

export type iCurador = {
    _codArma: string,
    _codEquipo: string,
    _nombre: string,
    _rolTirador: string,
    _bajas: number,
    _muertes: number,
    _fechaInscripcion: Date,
    _revivido: number,
}
export type iBombardero = {
    _codArma: string,
    _codEquipo: string,
    _nombre: string,
    _rolTirador: string,
    _bajas: number,
    _muertes: number,
    _fechaInscripcion: Date,
    _explosivoDetonado: number
}

export type XTirador = {
    _codArma: string,
    _codEquipo: string,
    _nombre: string,
    _rolTirador: string,
    _bajas: number,
    _muertes: number,
    _fechaInscripcion: Date,
    _revivido: number,
    _explosivoDetonado: number
}



export const STirador = model('tiradores', tiradorSchema)

