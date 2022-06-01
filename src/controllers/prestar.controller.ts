import { Request, Response } from "express";
import { Prestar, PrestarI } from "../models/Prestar";
const Sequelize = require('sequelize');
const {gte, lte} = Sequelize.Op;

export class PrestarController {

    public async getAllPrestar(req:Request,res:Response) {
        try {
            const prestar: PrestarI[] = await Prestar.findAll({
                where:{
                    activo:true
                }
            });
            res.status(200).json({prestar});
        } catch (error) {
            res.status(500).json({msg:error})
        }
    }
    public async getPrestamosEntredosFechas(req:Request,res:Response) {
        const {
            fecha_inicial, 
            fecha_final
        }= req.body;
        try {
            const prestar: PrestarI[] = await Prestar.findAll({
                where:{
                    activo:true,
                    fecha_pres: {
                        [gte]: fecha_inicial
                    },
                    fecha_dev: {
                        [lte]: fecha_final
                    }
                }
            });
            res.status(200).json({prestar});
        } catch (error) {
            res.status(500).json({msg:error})
        }
    }

    /*
                attr1: {
                    [gt]: 50   --- > attr1 > 50 gt = greater than; gte = greater than or equal 
                    },

                    attr2: {
                    [lte]: 45  -- > attr2 <= 50 = lesser than or equal to 
                    },

*/
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