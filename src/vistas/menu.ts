import { leerTeclado } from '../vistas/lecturaTeclado'

export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear Solar')
    console.log('2.- Cambiar superficie')
    console.log('3.- Salvar en BD')
    console.log('4.- Cargar Solar de la BD')
    console.log('5.- Modificar Solar de la BD')
    console.log('6.- Borrar Solar de la BD')
    console.log('7.- Mostrar Solar')
    console.log('8.- Listar Solares')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

