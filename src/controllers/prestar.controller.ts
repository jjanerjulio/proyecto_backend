import { Request, Response } from "express";
import { Ejemplar } from "../models/Ejemplar";
import { Prestar, PrestarI } from "../models/Prestar";
import { Usuario } from "../models/Usuario";

export class PrestarController {

    // public async getAllPrestar(req: Request, res:Response){
    //     try {
    //         const prestar: Prestar[] = await Prestar.findAll(
    //           {
    //             attributes:["id","fecha_pres", "fecha_dev","EjemplarId"],
    //             include:{
    //               model:Usuario,
    //               attributes: ['nombre']
    //             }
    //           }
    //         ) // select * from ventas;
    //         res.status(200).json({prestar})
    //     } catch (error) {
            
    //     }
    // }

    public async getAllPrestar(req:Request,res:Response) {
        try {
            const prestar: PrestarI[] = await Prestar.findAll({
                where:{activo:true}
            });
            res.status(200).json({prestar});
        } catch (error) {
            
        }
    }

    public async getOnePrestar(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const prestar: PrestarI | null = await Prestar.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({prestar});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createPrestar(req:Request,res:Response) {
        const {
            fecha_pres,
            fecha_dev,
            UsuarioId,
            EjemplarId,
            activo
        } = req.body;

        try {
            let body:PrestarI = {
                fecha_pres,
                fecha_dev,
                UsuarioId,
                EjemplarId,
                activo
            }
            const prestar = await Prestar.create({...body});
            res.status(200).json({prestar});
        } catch (error){

        }
    }

    public async updatePrestar(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            fecha_pres,
            fecha_dev,
            UsuarioId,
            EjemplarId,
            activo
        } = req.body;

        try {
            let body:PrestarI = {
                fecha_pres,
                fecha_dev,
                UsuarioId,
                EjemplarId,
                activo
            }
            const prestarExist: PrestarI | null = await Prestar.findByPk(pk);
            if(!prestarExist) return res.status(400).json({mns:"Prestar no existe"});
            await Prestar.update(body,{where: {id:pk}});
        }catch (error){

        }

        const prestar: PrestarI | null = await Prestar.findByPk(pk);
        if(prestar) return res.status(200).json({prestar});
    }
    
    public async deletePrestar(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const prestarExist: PrestarI | null = await Prestar.findByPk(pk);
            if(!prestarExist) return res.status(400).json({mns:"Prestar no existe"});
            await Prestar.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Prestar Eliminado"})
        }catch (error){

        }

        const prestar: PrestarI | null = await Prestar.findByPk(pk);
        if(prestar) return res.status(200).json({prestar});
    }
}