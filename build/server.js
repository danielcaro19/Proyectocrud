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
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
// import { Rectangulo, Rectangulos, tRectangulo} from './model/rectanguolo'
const solar_1 = require("./model/solar");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let lado1, lado2;
    // let rectangulo: Rectangulo = new Rectangulo(0,0)
    let nombre, codpost, superficie, precio;
    let solar = new solar_1.Solar("", 0, 0, 0);
    yield setBD(false); // true BD local; false BD Atlas
    do {
        n = yield menu_1.menu();
        switch (n) {
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre del solar');
                codpost = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el código postal donde se encuentra el solar'));
                lado1 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca en metros la medida de un lado de su solar'));
                lado2 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca en metros la medida del otro lado de su solar'));
                superficie = solar.setsuperficie(lado1, lado2);
                precio = solar.setprecio(superficie, codpost);
                solar = new solar_1.Solar(nombre, codpost, superficie, precio);
                break;
            case 2:
                lado1 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca en metros la medida de un lado de su solar'));
                lado2 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca en metros la medida del otro lado de su solar'));
                superficie = solar.setsuperficie(lado1, lado2);
                break;
            case 3:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: solar.nombre,
                    _codpost: solar.codpost,
                    _superficie: solar.superficie,
                    _precio: solar.precio,
                };
                const oSchema = new solar_1.Solares(dSchema);
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 4:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre único del solar');
                yield solar_1.Solares.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('No existe');
                        else {
                            console.log('Existe: ' + doc);
                            solar =
                                new solar_1.Solar(doc._nombre, doc._codpost, doc._superficie, doc._precio);
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 5:
                yield database_1.db.conectarBD();
                yield solar_1.Solares.findOneAndUpdate({ _nombre: solar.nombre }, {
                    _nombre: solar.nombre,
                    _codpost: solar.codpost,
                    _superficie: solar.superficie,
                    _precio: solar.precio,
                }, {
                    runValidators: true // para que se ejecuten las validaciones del Schema
                })
                    .then(() => console.log('Modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 6:
                yield database_1.db.conectarBD();
                yield solar_1.Solares.findOneAndDelete({ _nombre: solar.nombre }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No encontrado`);
                        else
                            console.log('Borrado correcto: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 7:
                console.log(`Nombre: ${solar.nombre}`);
                console.log(`Codpost: ${solar.codpost}`);
                console.log(`Superficie: ${solar.superficie}`);
                console.log(`Precio: ${solar.precio}`);
                break;
            case 8:
                yield database_1.db.conectarBD();
                let tmpSolar;
                let dSolar;
                query = yield solar_1.Solares.find({});
                for (dSolar of query) {
                    tmpSolar =
                        new solar_1.Solar(dSolar._nombre, dSolar._codpost, dSolar._superficie, dSolar._precio);
                    console.log(`Solar ${tmpSolar.nombre} Superficie: ${tmpSolar.superficie}`);
                }
                yield database_1.db.desconectarBD();
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'geometria';
    const conexionLocal = `mongodb://locadlhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'prueba';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.viyli.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
