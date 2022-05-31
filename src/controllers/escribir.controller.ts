import { Request, Response } from "express";
import { Escribir, EscribirI } from "../models/Escribir";

export class EscribirController {

    public async getAllEscribir(req:Request,res:Response) {
        try {
            const escribir: EscribirI[] = await Escribir.findAll({
                where:{activo:true}
            });
            res.status(200).json({escribir});
        } catch (error) {
            
        }
    }

    public async getOneEscribir(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const escribir: EscribirI | null = await Escribir.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({escribir});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createEscribir(req:Request,res:Response) {
        const {
            Fecha,
            AutorId,
            LibroId,
            activo,
        } = req.body;

        try {
            let body:EscribirI = {
                Fecha,
                AutorId,
                LibroId,
                activo
            }
            const escribir = await Escribir.create({...body});
            res.status(200).json({escribir});
        } catch (error){

        }
    }

    public async updateEscribir(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            Fecha,
            AutorId,
            LibroId,
            activo
        } = req.body;

        try {
            let body:EscribirI = {
                Fecha,
                AutorId,
                LibroId,
                activo
            }
            const escribirExist: EscribirI | null = await Escribir.findByPk(pk);
            if(!escribirExist) return res.status(400).json({mns:"Escribir no existe"});
            await Escribir.update(body,{where: {id:pk}});
        }catch (error){

        }

        const escribir: EscribirI | null = await Escribir.findByPk(pk);
        if(escribir) return res.status(200).json({escribir});
    }
    
    public async deleteEscribir(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const escribirExist: EscribirI | null = await Escribir.findByPk(pk);
            if(!escribirExist) return res.status(400).json({mns:"Escribir no existe"});
            await Escribir.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Votacion Eliminado"})
        }catch (error){

        }

        const escribir: EscribirI | null = await Escribir.findByPk(pk);
        if(escribir) return res.status(200).json({escribir});
    }
}