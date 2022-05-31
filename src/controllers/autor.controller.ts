import { Request, Response } from "express";
import { Autor, AutorI } from "../models/Autor";

export class AutorController {

    public async getAllAutor(req:Request,res:Response) {
        try {
            const autor: AutorI[] = await Autor.findAll({
                where:{activo:true}
            });
            res.status(200).json({autor});
        } catch (error) {
            
        }
    }

    public async getOneAutor(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const autor: AutorI | null = await Autor.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({autor});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createAutor(req:Request,res:Response) {
        const {
            nombre,
            activo,
        } = req.body;

        try {
            let body:AutorI = {
                nombre,
                activo
            }
            const autor = await Autor.create({...body});
            res.status(200).json({autor});
        } catch (error){

        }
    }

    public async updateAutor(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            nombre,
            activo
        } = req.body;

        try {
            let body:AutorI = {
                nombre,
                activo
            }
            const autorExist: AutorI | null = await Autor.findByPk(pk);
            if(!autorExist) return res.status(400).json({mns:"Autor no existe"});
            await Autor.update(body,{where: {id:pk}});
        }catch (error){

        }

        const autor: AutorI | null = await Autor.findByPk(pk);
        if(autor) return res.status(200).json({autor});
    }
    
    public async deleteAutor(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const autorExist: AutorI | null = await Autor.findByPk(pk);
            if(!autorExist) return res.status(400).json({mns:"Escribir no existe"});
            await Autor.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Autor Eliminado"})
        }catch (error){

        }

        const autor: AutorI | null = await Autor.findByPk(pk);
        if(autor) return res.status(200).json({autor});
    }
}