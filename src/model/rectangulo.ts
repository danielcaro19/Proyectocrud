import {Schema, model } from 'mongoose'

export class Rectangulo{
    private _lado1: number
    private _lado2: number


    constructor(_lado1:number, _lado2:number
        ){
        this._lado1 = _lado1
        this._lado2 = _lado2
    }
    get lado1(){
        return this._lado1
    }

    get lado2(){
        return this._lado2
    }
    area(){
        return (this._lado1*this._lado2)
    }
}

// Definimos el type
export type tRectangulo = {
    _lado1: number,
    _lado2: number,
}

// Definimos el Schema
const rectanguloSchema = new Schema({
    _lado1: Number,
    _lado2: Number,
})

// La colección de la BD:(Plural siempre)
export const Rectangulos = model('rectangulo', rectanguloSchema)
