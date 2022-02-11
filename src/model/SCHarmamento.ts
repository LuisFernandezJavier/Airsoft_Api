import { Schema, model } from 'mongoose';
import { Accesorio } from '../clases/Accesorio/accesorio';
import{SAccesorio} from '../model/SCHaccesorio'

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
    },
    
})


export type iArma = {
    _codArma: string, 
    _nombreArma: string ,
    _fechaProduccion: Date ,
    _precioBase: number ,
    _disparoAutomatico: boolean ,
    _categoriaArma: string ,
    _animaRayada: boolean, 
    _calibre: number ,
    _accesorio : Accesorio[] 
}



export const SArma = model('armas', armaSchema) 