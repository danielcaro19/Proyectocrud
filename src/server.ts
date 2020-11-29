import { menu } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
// import { Rectangulo, Rectangulos, tRectangulo} from './model/rectanguolo'
import {Solar, Solares, tSolar} from './model/solar'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let lado1: number, lado2: number
    // let rectangulo: Rectangulo = new Rectangulo(0,0)
    let nombre:string,codpost:number,superficie:number,precio:number
    let solar: Solar = new Solar("",0,0,0)



    await setBD(false) // true BD local; false BD Atlas

    do {
        n = await menu()

        switch(n){
            case 1:
                nombre=await leerTeclado('Introduzca el nombre del solar')
                codpost=parseInt( await leerTeclado('Introduzca el código postal donde se encuentra el solar'))
                lado1=parseInt( await leerTeclado('Introduzca en metros la medida de un lado de su solar'))
                lado2=parseInt( await leerTeclado('Introduzca en metros la medida del otro lado de su solar'))
                superficie=solar.setsuperficie(lado1,lado2)
                precio=solar.setprecio(superficie,codpost)
                solar= new Solar(nombre,codpost,superficie,precio)
                break
            case 2:
                lado1=parseInt( await leerTeclado('Introduzca en metros la medida de un lado de su solar'))
                lado2=parseInt( await leerTeclado('Introduzca en metros la medida del otro lado de su solar'))
                superficie=solar.setsuperficie(lado1,lado2)
                break
            case 3:
                await db.conectarBD()
                const dSchema = {
                    _nombre: solar.nombre,
                    _codpost: solar.codpost,
                    _superficie: solar.superficie,
                    _precio: solar.precio,
                }
                const oSchema = new Solares(dSchema)
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err))
                await db.desconectarBD()
                break
            case 4:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre único del solar')
                await Solares.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('No existe')
                            else {
                                console.log('Existe: '+ doc)
                                solar = 
                                    new Solar(doc._nombre, doc._codpost, doc._superficie, doc._precio)
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 5:
                await db.conectarBD()
                await Solares.findOneAndUpdate( 
                    { _nombre: solar.nombre }, 
                    {
                        _nombre: solar.nombre,
                        _codpost: solar.codpost,
                        _superficie: solar.superficie,
                        _precio: solar.precio,
                    },
                    {
                        runValidators: true // para que se ejecuten las validaciones del Schema
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err))
                await db.desconectarBD()
                break
            case 6:
                await db.conectarBD()
                await Solares.findOneAndDelete(
                    { _nombre: solar.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 7:
                console.log(`Nombre: ${solar.nombre}`)
                console.log(`Codpost: ${solar.codpost}`)
                console.log(`Superficie: ${solar.superficie}`)
                console.log(`Precio: ${solar.precio}`)                               
                break
            case 8:
                await db.conectarBD()
                let tmpSolar: Solar
                let dSolar: tSolar
                query =  await Solares.find( {} )
                for (dSolar of query){
                    tmpSolar = 
                        new Solar(dSolar._nombre, dSolar._codpost, 
                                dSolar._superficie, dSolar._precio)
                    console.log(`Solar ${tmpSolar.nombre} Superficie: ${tmpSolar.superficie}`)
                }
                await db.desconectarBD()                          
                break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'geometria'

    const conexionLocal = `mongodb://locadlhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'prueba'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.viyli.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()