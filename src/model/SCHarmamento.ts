import { Schema, model } from 'mongoose';

const armaSchema = new Schema({
    _codArma: {
        type: String
    },
    _nombreArma: {
        type: String
    },
    _fechaProduccion: {
        type: Date
    },
    _precioBase: {
        type: Number
    },
    _disparoAutomatico: {
        type: Boolean
    },
    _categoriaArma: {
        type: String
    },
    _animaRayada: {
        type: Boolean
    },
    _calibre: {
        type: Number
    }
})

export type iArma = {
    _codArma: number | null,
    _nombreArma: string | null,
    _fechaProduccion: Date | null,
    _precioBase: number | null,
    _disparoAutomatico: boolean | null,
    _categoriaArma: string | null,
    _animaRayada: boolean | null,
    _calibre: number | null
}



export const SArma = model('armas', armaSchema) 