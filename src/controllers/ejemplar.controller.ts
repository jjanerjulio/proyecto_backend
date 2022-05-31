import { Request, Response } from "express";
import { Ejemplar, EjemplarI } from "../models/Ejemplar";

export class EjemplarController {

    public async getAllEjemplar(req:Request,res:Response) {
        try {
            const ejemplar: EjemplarI[] = await Ejemplar.findAll({
                where:{activo:true}
            });
            res.status(200).json({ejemplar});
        } catch (error) {
            
        }
    }

    public async getOneEjemplar(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const ejemplar: EjemplarI | null = await Ejemplar.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({ejemplar});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createEjemplar(req:Request,res:Response) {
        const {
            LibroId,
            localizacion,
            activo
        } = req.body;

        try {
            let body:EjemplarI = {
                LibroId,
                localizacion,
                activo
            }
            const ejemplar = await Ejemplar.create({...body});
            res.status(200).json({ejemplar});
        } catch (error){

        }
    }

    public async updateEjemplar(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            LibroId,
            localizacion,
            activo
        } = req.body;

        try {
            let body:EjemplarI = {
                LibroId,
                localizacion,
                activo
            }
            const ejemplarExist: EjemplarI | null = await Ejemplar.findByPk(pk);
            if(!ejemplarExist) return res.status(400).json({mns:"Escribir no existe"});
            await Ejemplar.update(body,{where: {id:pk}});
        }catch (error){

        }

        const ejemplar: EjemplarI | null = await Ejemplar.findByPk(pk);
        if(ejemplar) return res.status(200).json({ejemplar});
    }
    
    public async deleteEjemplar(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const ejemplarExist: EjemplarI | null = await Ejemplar.findByPk(pk);
            if(!ejemplarExist) return res.status(400).json({mns:"Ejemplar no existe"});
            await Ejemplar.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Ejemplar Eliminado"})
        }catch (error){

        }

        const ejemplar: EjemplarI | null = await Ejemplar.findByPk(pk);
        if(ejemplar) return res.status(200).json({ejemplar});
    }
}