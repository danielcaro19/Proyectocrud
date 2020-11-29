"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangulos = exports.Rectangulo = void 0;
const mongoose_1 = require("mongoose");
class Rectangulo {
    constructor(_lado1, _lado2) {
        this._lado1 = _lado1;
        this._lado2 = _lado2;
    }
    get lado1() {
        return this._lado1;
    }
    get lado2() {
        return this._lado2;
    }
    area() {
        return (this._lado1 * this._lado2);
    }
}
exports.Rectangulo = Rectangulo;
// Definimos el Schema
const rectanguloSchema = new mongoose_1.Schema({
    _lado1: Number,
    _lado2: Number,
});
// La colección de la BD:(Plural siempre)
exports.Rectangulos = mongoose_1.model('rectangulo', rectanguloSchema);
