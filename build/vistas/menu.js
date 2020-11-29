"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menu = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Crear Solar');
    console.log('2.- Cambiar superficie');
    console.log('3.- Salvar en BD');
    console.log('4.- Cargar Solar de la BD');
    console.log('5.- Modificar Solar de la BD');
    console.log('6.- Borrar Solar de la BD');
    console.log('7.- Mostrar Solar');
    console.log('8.- Listar Solares');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
