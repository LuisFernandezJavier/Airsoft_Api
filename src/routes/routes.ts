import { Request, Response, Router } from 'express';
import { db } from '../database/database';

import { SArma, iArma } from '../model/SCHarmamento';
import { SEquipo } from '../model/SCHequipo';
import { iAccesorio, SAccesorio, xAccesorio } from '../model/SCHaccesorio';
import { iBombardero, iCurador, iTirador, STirador, XTirador } from '../model/SCHtirador';
import { Arma } from '../clases/Armamento/arma';
import { Accesorio } from '../clases/Accesorio/accesorio';
import { Tirador } from '../clases/Tirador/tirador';
import { Curador } from '../clases/Tirador/curador';
import { Bombardero } from '../clases/Tirador/bombardero';
import { Cargador } from '../clases/Accesorio/cargador';
import { Cañon } from '../clases/Accesorio/cañon';
import { Mirilla } from '../clases/Accesorio/mirilla';
import { Equipo } from '../clases/Equipo/equipo';
import { SLogin } from '../model/SCHlogin';



class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    // funciones basicas para las armas

    private listoArmas = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SArma.find({})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private newArma = async (req: Request, res: Response) => {

        const arma = new SArma(req.body)
        console.log(arma);
        let objArma = new SArma({
            _codArma: arma._codArma,
            _nombreArma: arma._nombreArma,
            _fechaProduccion: arma._fechaProduccion,
            _precioBase: arma._precioBase,
            _disparoAutomatico: arma._disparoAutomatico,
            _categoriaArma: arma._categoriaArma,
            _animaRayada: arma._animaRayada,
            _calibre: arma._calibre,
        })

        console.log(objArma)


        await db.conectarBD()
            .then(async () => {
                await objArma.save()
                    .then((mensaje: any) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
            })
            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()
    }

    private obtengoArma = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SArma.aggregate([
                    {
                        $match: { "_codArma": cod }

                    }])
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }

    private modificoArma = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const cod = req.params.cod
                const modarma = (req.body)

                await SArma.findOneAndUpdate(
                    { _codArma: cod },
                    {
                        _codArma: modarma._codArma,
                        _nombreArma: modarma._nombreArma,
                        _fechaProduccion: modarma._fechaProduccion,
                        _precioBase: modarma._precioBase,
                        _disparoAutomatico: modarma._disparoAutomatico,
                        _categoriaArma: modarma._categoriaArma,
                        _animaRayada: modarma._animaRayada,
                        _calibre: modarma._calibre,

                    },
                    { new: true }
                )
                    .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                    .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
            })

            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()
    }

    private borroArma = async (req: Request, res: Response) => {
        const cod = req.params.cod

        await db.conectarBD()
        await SArma.findOneAndDelete(
            {
                "_codArma": cod
            }
        )
            .then((doc: any) => res.send("Documento borrado " + doc))
            .catch((error: any) => res.send('Error:  ' + error))
        await db.desconectarBD()
    }

    // funcines basicas para tiradores

    private listoTiradores = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await STirador.find({})
                console.log(query)
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private newTirador = async (req: Request, res: Response) => {

        const tirador = new STirador(req.body)
        let objTirador: any;
        console.log(tirador._rolTirador);

        if (tirador._rolTirador == 'Curador') {
            console.log("elijo curador");
            objTirador = new STirador({
                _codArma: tirador._codArma,
                _codEquipo: tirador._codEquipo,
                _nombre: tirador._nombre,
                _rolTirador: tirador._rolTirador,
                _bajas: tirador._bajas,
                _muertes: tirador._muertes,
                _fechaInscripcion: tirador._fechaInscripcion,
                _revivido: tirador._revivido
            });
        } else if (tirador._rolTirador == 'Bombardero') {
            console.log('tiro muchas bombas');
            objTirador = new STirador({
                _codArma: tirador._codArma,
                _codEquipo: tirador._codEquipo,
                _nombre: tirador._nombre,
                _rolTirador: tirador._rolTirador,
                _bajas: tirador._bajas,
                _muertes: tirador._muertes,
                _fechaInscripcion: tirador._fechaInscripcion,
                _explosivoDetonado: tirador._explosivoDetonado
            });
        } else if (tirador._rolTirador == 'Tirador') {
            console.log('solo disparo')
            objTirador = new STirador({
                _codArma: tirador._codArma,
                _codEquipo: tirador._codEquipo,
                _nombre: tirador._nombre,
                _rolTirador: tirador.rolTirador,
                _bajas: tirador._bajas,
                _muertes: tirador._muertes,
                _fechaInscripcion: tirador._fechaInscripcion
            });
        }

        console.log(objTirador)
        console.log('lo que llega', tirador)


        await db.conectarBD()
            .then(async () => {
                await objTirador.save()
                    .then((mensaje: any) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
            })
            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()

    }

    private obtengoTirador = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await STirador.find({ _codArma: cod })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }


    private modificoTirador = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const cod = req.params.cod
                const modtirador = (req.body)
                if (modtirador._rolTirador == 'Curador') {
                    console.log("elijo curador");
                    await STirador.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codArma: modtirador._codArma,
                            _codEquipo: modtirador._codEquipo,
                            _nombre: modtirador._nombre,
                            _rolTirador: modtirador._rolTirador,
                            _bajas: modtirador._bajas,
                            _muertes: modtirador._muertes,
                            _fechaInscripcion: modtirador._fechaInscripcion,
                            _revivido: modtirador._revivido
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                } else if (modtirador._rolTirador == 'Bombardero') {
                    console.log("elijo bombardero");
                    await STirador.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codArma: modtirador._codArma,
                            _codEquipo: modtirador._codEquipo,
                            _nombre: modtirador._nombre,
                            _rolTirador: modtirador._rolTirador,
                            _bajas: modtirador._bajas,
                            _muertes: modtirador._muertes,
                            _fechaInscripcion: modtirador._fechaInscripcion,
                            _explosivoDetonado: modtirador._explosivoDetonado
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                } else {
                    console.log("solo disparo");
                    await STirador.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codArma: modtirador._codArma,
                            _codEquipo: modtirador._codEquipo,
                            _nombre: modtirador._nombre,
                            _rolTirador: modtirador._rolTirador,
                            _bajas: modtirador._bajas,
                            _muertes: modtirador._muertes,
                            _fechaInscripcion: modtirador._fechaInscripcion,
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                }
            })

            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()
    }

    private borroTirador = async (req: Request, res: Response) => {
        const cod = req.params.cod

        await db.conectarBD()
        await STirador.findOneAndDelete(
            {
                "_codArma": cod
            }
        )
            .then((doc: any) => res.send("Documento borrado " + doc))
            .catch((error: any) => res.send('Error:  ' + error))
        await db.desconectarBD()
    }

    // funciones basicas para los equipos

    private listoEquipos = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await STirador.find({_codEquipo : cod})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private obtengoEquipo = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SEquipo.aggregate([
                    {
                        $match: { "_codEquipo": cod }
                    }])
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }

    private newEquipo = async (req: Request, res: Response) => {

        const equipo = new SEquipo(req.body)
        console.log(equipo);
        let objEquipo = new SEquipo({
            _codEquipo: equipo._codEquipo,
            _nombreEquipo: equipo._nombreEquipo,
            _creacionEquipo: equipo._creacionEquipo
        })

        console.log(objEquipo)


        await db.conectarBD()
            .then(async () => {
                await objEquipo.save()
                    .then((mensaje: any) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
            })
            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()
    }

    private modificoEquipo = async (req: Request, res: Response) => {
        {
            await db.conectarBD()
                .then(async () => {
                    const cod = req.params.cod
                    const modequipo = (req.body)

                    await SArma.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codEquipo: modequipo._codEquipo,
                            _nombreEquipo: modequipo._nombreEquipo,
                            _creacionEquipo: modequipo._creacionEquipo

                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                })

                .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
            db.desconectarBD()
        }
    }

    private borroEquipo = async (req: Request, res: Response) => {
        const cod = req.params.cod

        await db.conectarBD()
        await SArma.findOneAndDelete(
            {
                "_codEquipo": cod
            }
        )
            .then((doc: any) => res.send("Documento borrado " + doc))
            .catch((error: any) => res.send('Error:  ' + error))
        await db.desconectarBD()
    }

    //FUNCIONES BASICAS ACCESORIOS

    private listoAccesorios = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SAccesorio.find({})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private obtengoAccesorio = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SAccesorio.find({ _idAccesorio: cod })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }

    private obtengoAccesorioCodArma = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SAccesorio.find({ _codArma: cod })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }

    private newAccesorio = async (req: Request, res: Response) => {

        const accesorio = new SAccesorio(req.body)
        let objAccesorio: any;
        console.log(accesorio._tipoAccesorio);

        if (accesorio._tipoAccesorio == 'Cargador') {
            console.log("elijo cargador");
            objAccesorio = new SAccesorio({
                _codArma: accesorio._codArma,
                _idAccesorio: accesorio._idAccesorio,
                _nombre: accesorio._nombre,
                _tipoAccesorio: accesorio._tipoAccesorio,
                _precio: accesorio._precio,
                _numeroBalas: accesorio._numeroBalas

            });
        } else if (accesorio._tipoAccesorio == 'Cañon') {
            console.log('elijo cañon');
            objAccesorio = new SAccesorio({
                _codArma: accesorio._codArma,
                _idAccesorio: accesorio._idAccesorio,
                _nombre: accesorio._nombre,
                _tipoAccesorio: accesorio._tipoAccesorio,
                _precio: accesorio._precio,
                _longitudCanon: accesorio._longitudCanon
            });
        } else {
            console.log('elijo mirilla');
            objAccesorio = new SAccesorio({
                _codArma: accesorio._codArma,
                _idAccesorio: accesorio._idAccesorio,
                _nombre: accesorio._nombre,
                _tipoAccesorio: accesorio._tipoAccesorio,
                _precio: accesorio._precio,
                _zoom: accesorio._zoom,
                _tipoMirilla: accesorio._tipoMirilla,
            });
        }

        console.log(objAccesorio)
        console.log('lo que llega', accesorio)


        await db.conectarBD()
            .then(async () => {
                await objAccesorio.save()
                    .then((mensaje: any) => res.send(`Introducido correctamente en la base de datos ${mensaje}`))
                    .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
            })
            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()

    }

    private modificoAccesorio = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const cod = req.params.cod
                const modaccesorio = (req.body)
                if (modaccesorio._tipoAccesorio == 'Cargador') {
                    console.log("elijo cargador");
                    await SAccesorio.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codArma: modaccesorio._codArma,
                            _idAccesorio: modaccesorio._idAccesorio,
                            _nombre: modaccesorio._nombre,
                            _tipoAccesorio: modaccesorio._tipoAccesorio,
                            _precio: modaccesorio._precio,
                            _numeroBalas: modaccesorio._numeroBalas
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                } else if (modaccesorio._tipoAccesorio == 'Cañon') {
                    console.log("elijo bombardero");
                    await SAccesorio.findOneAndUpdate(
                        { _codArma: cod },
                        {
                            _codArma: modaccesorio._codArma,
                            _idAccesorio: modaccesorio._idAccesorio,
                            _nombre: modaccesorio._nombre,
                            _tipoAccesorio: modaccesorio._tipoAccesorio,
                            _precio: modaccesorio._precio,
                            _longitudCañon: modaccesorio._longitudCañon
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                } else {
                    console.log("solo disparo");
                    await SAccesorio.findOneAndUpdate(
                        { _idAccesorio: cod },
                        {
                            _codArma: modaccesorio._codArma,
                            _idAccesorio: modaccesorio._idAccesorio,
                            _nombre: modaccesorio._nombre,
                            _tipoAccesorio: modaccesorio._tipoAccesorio,
                            _precio: modaccesorio._precio,
                            _zoom: modaccesorio._zoom,
                            _tipoMirilla: modaccesorio._tipoMirilla
                        },
                        { new: true }
                    )
                        .then((mensaje: any) => res.send(`Modificado correctamente en la base de datos ${mensaje}`))
                        .catch((error: any) => res.send(`Error en la subida del documento a ${db}: ${error}`))
                }
            })

            .catch((error: any) => res.send(`Error conectando a ${db}: ${error}`))
        db.desconectarBD()
    }

    private borroAccesorio = async (req: Request, res: Response) => {
        const cod = req.params.cod

        await db.conectarBD()
        await SAccesorio.findOneAndDelete(
            {
                "_codArma": cod
            }
        )
            .then((doc: any) => res.send("Documento borrado " + doc))
            .catch((error: any) => res.send('Error:  ' + error))
        await db.desconectarBD()
    }

  
//calculo el kda de 1 solo tirador

    private KDATirador = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                
                let objeto: any
                let dTirador: iTirador
                let dCurador: iCurador
                let dBombardero: iBombardero



                const query: any = await STirador.find({ _codArma: cod })

                if (query[0]._rolTirador == "Tirador") {
                    for (dTirador of query) {
                        objeto = new Tirador(
                            dTirador._codArma,
                            dTirador._codEquipo,
                            dTirador._nombre,
                            dTirador._rolTirador,
                            dTirador._bajas,
                            dTirador._muertes,
                            dTirador._fechaInscripcion
                        )
                    }
                } else if (query[0]._rolTirador == "Curador") {
                    for (dCurador of query) {
                        objeto = new Curador(
                            dCurador._codArma,
                            dCurador._codEquipo,
                            dCurador._nombre,
                            dCurador._rolTirador,
                            dCurador._bajas,
                            dCurador._muertes,
                            dCurador._fechaInscripcion,
                            dCurador._revivido
                        )
                    }
                } else {
                    for (dBombardero of query) {
                        objeto = new Bombardero(
                            dBombardero._codArma,
                            dBombardero._codEquipo,
                            dBombardero._nombre,
                            dBombardero._rolTirador,
                            dBombardero._bajas,
                            dBombardero._muertes,
                            dBombardero._fechaInscripcion,
                            dBombardero._explosivoDetonado
                        )
                    }
                }
                console.log(objeto._bajas)
                console.log(objeto._muertes)
                console.log("SOY", query[0]._rolTirador)
                console.log("revivo", objeto._revivido)
                console.log(objeto.KDA())



                res.json(objeto.KDA())
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }

    //envio al front ARRAY DE [NOMBRE TRIADOR , BAJAS , MUERTES , SU KDA]

    private KDAEQUIPO = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)

                let arrayT: Tirador[] = []
                let dTirador: Tirador = new Tirador ("","","","",0,0,new Date())
                

               
                const query: any = await STirador.find({ _codEquipo: cod })
                console.log(query)

                for (let a of query){
                    if (a._rolTirador == "Tirador") {
                        
                            dTirador = new Tirador(
                                a._codArma,
                                a._codEquipo,
                                a._nombre,
                                a._rolTirador,
                                a._bajas,
                                a._muertes,
                                a._fechaInscripcion
                            )
                            arrayT.push(dTirador)
                        
                    } else if (a._rolTirador == "Curador") {
                        
                            dTirador = new Curador(
                                a._codArma,
                                a._codEquipo,
                                a._nombre,
                                a._rolTirador,
                                a._bajas,
                                a._muertes,
                                a._fechaInscripcion,
                                a._revivido
                            )
                            arrayT.push(dTirador)
                        
                    } else {
                        
                            dTirador = new Bombardero(
                                a._codArma,
                                a._codEquipo,
                                a._nombre,
                                a._rolTirador,
                                a._bajas,
                                a._muertes,
                                a._fechaInscripcion,
                                a._explosivoDetonado
                            )
                            arrayT.push(dTirador)
                        
                    }
                }

            

                //recorro los tiradores del equipo y calculo sus kda
                let kdaNom :  any [] = []
                
                let tmpkda : number = 0
                arrayT.forEach(element => {
                      tmpkda=element.KDA()
                      let nombre = element.nombre
                      let codArma = element.codArma
                      let bajas = element.bajas
                      let muertes = element.muertes
                      kdaNom.push({nombre,tmpkda,codArma , bajas , muertes})
                      
                     
                })
                res.json(kdaNom)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }




// CALCULO EL VALOR TOTAL ACTUAL DEL ARMA CON SUS ACCESORIOS  EN CASO DE TENERLOS

    private ArmayAcesorio = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                let tmpAccesorio: Accesorio = new Accesorio("", "", "", "", 0);
                let armaMontada: Arma = new Arma("", "", new Date, 0, false, "", false, 0,);
                let dArma: iArma
                let dAccesorio: xAccesorio

                let query2: any = await SAccesorio.find({ _codArma: cod })
                let query: any = await SArma.find({ _codArma: cod })

                //creo el objeto ARMA
                for (dArma of query) {
                    armaMontada = new Arma(
                        dArma._codArma,
                        dArma._nombreArma,
                        dArma._fechaProduccion,
                        dArma._precioBase,
                        dArma._disparoAutomatico,
                        dArma._categoriaArma,
                        dArma._animaRayada,
                        dArma._calibre ,

                    )
                }
                //calculo el valor del arma 
                let precioArma: number = armaMontada.valorF()

                
                // creo el objeto accesorio (cualquiera de los que exiten)
                let arrayA: Accesorio[] = []

                for (dAccesorio of query2) {
                    if (query2._tipoAccesorio == "Cargador") {
                        tmpAccesorio = new Cargador(
                            dAccesorio._codArma,
                            dAccesorio._idAccesorio,
                            dAccesorio._nombre,
                            dAccesorio._tipoAccesorio,
                            dAccesorio._precio,
                            dAccesorio._numeroBalas)
                    } else if (query2._tipoAccesorio == "Cañon") {
                        tmpAccesorio = new Cañon(
                            dAccesorio._codArma,
                            dAccesorio._idAccesorio,
                            dAccesorio._nombre,
                            dAccesorio._tipoAccesorio,
                            dAccesorio._precio,
                            dAccesorio._longitudCanon)
                    } else {
                        tmpAccesorio = new Mirilla(
                            dAccesorio._codArma,
                            dAccesorio._idAccesorio,
                            dAccesorio._nombre,
                            dAccesorio._tipoAccesorio,
                            dAccesorio._precio,
                            dAccesorio._zoom,
                            dAccesorio._tipoAccesorio)
                    }
                    arrayA.push(tmpAccesorio)
                }

                // monto los accesorios en el arma 
                arrayA.forEach(element => {
                    armaMontada.addAccesorio(element)
                })

                //recorro el array de accesorios del objeto armamontada y sumo todo sus precios
                let precioAccesorios: number = 0
                for (let a of armaMontada.accesorio) {
                    precioAccesorios += a.setPrecioF()
                }

                console.log("precio ac", precioAccesorios)
                console.log(precioArma)
                let valorTotalFinal : number = (precioAccesorios+precioArma)
                
                console.log(valorTotalFinal)
                res.json(valorTotalFinal)



            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

// ENVIO AL FRONT EL UNICO USUARIO Y PASS QUE EXISTEN PARA LOGEARSE     
    private testLogin = async (req: Request, res: Response) => {
        const cod = req.params.cod
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await SLogin.findOne({_codLogin:"1"})
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
    }






    misRutas() {
        // RUTAS BASICAS ARMAS
        this._router.get('/listaArmas', this.listoArmas)
        this._router.post('/nuevaArma', this.newArma)
        this._router.get('/obtengoArma/:cod', this.obtengoArma)
        this._router.put('/modificoArma/:cod', this.modificoArma)
        this._router.delete('/borroArma/:cod', this.borroArma)

        // RUTAS BASICAS TIRADORRES
        this._router.get('/listaTiradores', this.listoTiradores)
        this._router.post('/nuevoTirador', this.newTirador)
        this._router.get('/obtengoTirador/:cod', this.obtengoTirador)
        this._router.put('/modificoTirador/:cod', this.modificoTirador)
        this._router.delete('/borroTirador/:cod', this.borroTirador)

        // RUTAS BASICAS EQUIPO
        this._router.get('/listaEquipos/:cod', this.listoEquipos)
        this._router.post('/nuevoEquipo', this.newEquipo)
        this._router.get('/obtengoEquipo/:cod', this.obtengoEquipo)
        this._router.put('/modificoEquipo/:cod', this.modificoEquipo)
        this._router.delete('/borroEquipo/:cod', this.borroEquipo)

        // RUTAS BASICAS ACCESORIOS
        this._router.get('/listaAccesorios', this.listoAccesorios)
        this._router.post('/nuevoAccesorio', this.newAccesorio)
        this._router.get('/obtengoAccesorio/:cod', this.obtengoAccesorio)
        this._router.get('/obtengoAccesorioCA/:cod', this.obtengoAccesorioCodArma)
        this._router.put('/modificoAccesorio/:cod', this.modificoAccesorio)
        this._router.delete('/borroAccesorio/:cod', this.borroAccesorio)

        //RUTA CALCULO
        //this._router.get('/valorArma/:cod', this.valorArma)
        this._router.get('/KDA/:cod', this.KDATirador)
        this._router.get('/armaMontada/:cod', this.ArmayAcesorio)
        this._router.get('/KDAequipo/:cod', this.KDAEQUIPO)

        //RUTA LOGIN
        this.router.get('/login/:cod', this.testLogin)
    }

}



const obj = new DatoRoutes()
obj.misRutas()

export const routes = obj.router