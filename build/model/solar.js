"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solares = exports.Solar = void 0;
const mongoose_1 = require("mongoose");
// import {Rectangulo} from './rectangulo'
class Solar {
    constructor(nombre, codpost, superficie, precio) {
        this._nombre = nombre;
        this._codigopostal = codpost;
        this._metroscuadrados = superficie;
        this._precio = precio;
    }
    get nombre() {
        return this._nombre;
    }
    get codpost() {
        return this._codigopostal;
    }
    setsuperficie(lado1, lado2) {
        this._metroscuadrados = lado1 * lado2;
        return this._metroscuadrados;
    }
    get superficie() {
        return this._metroscuadrados;
    }
    setprecio(superficie, codpost) {
        this._precio = superficie * (codpost / 100);
        return this._precio;
    }
    get precio() {
        return this._precio;
    }
}
exports.Solar = Solar;
const solarSchema = new mongoose_1.Schema({
    _nombre: String,
    //_forma:Rectangulo,
    _codigopostal: Number,
    _metroscuadrados: Number,
    _precio: Number,
});
exports.Solares = mongoose_1.model('solares', solarSchema);
