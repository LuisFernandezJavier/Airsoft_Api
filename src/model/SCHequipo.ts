import {Schema, model } from 'mongoose';

export const equipoSchema = new Schema({
    _codEquipo: {
        type: String
    },
    _nombreEquipo: {
        type: String
    },
    _creacionEquipo:{
        type: Date
    }
})




export const SEquipo = model('equipos', equipoSchema) 