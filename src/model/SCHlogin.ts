import {Schema, model } from 'mongoose';

export const loginSchema = new Schema({
    _codLogin: {
        type: String
    },
    _pass:{
        type: String
    },
    _usuario: {
        type: String
    }
})




export const SLogin = model('loginuser', loginSchema) 