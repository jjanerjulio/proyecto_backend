import { Request, Response } from "express";
import { Libro, LibroI } from "../models/Libro";

export class LibroController {

    public async getAllLibro(req:Request,res:Response) {
        try {
            const libro: LibroI[] = await Libro.findAll({
                where:{activo:true}
            });
            res.status(200).json({libro});
        } catch (error) {
            
        }
    }

    public async getOneLibro(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const libro: LibroI | null = await Libro.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({libro});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createLibro(req:Request,res:Response) {
        const {
            titulo,
            numero_pag,
            editorial,
            ISBN,
            activo
        } = req.body;

        try {
            let body:LibroI = {
                titulo,
                numero_pag,
                editorial,
                ISBN,
                activo
            }
            const libro = await Libro.create({...body});
            res.status(200).json({libro});
        } catch (error){

        }
    }

    public async updateLibro(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            titulo,
            numero_pag,
            editorial,
            ISBN,
            activo
        } = req.body;

        try {
            let body:LibroI = {
                titulo,
                numero_pag,
                editorial,
                ISBN,
                activo
            }
            const libroExist: LibroI | null = await Libro.findByPk(pk);
            if(!libroExist) return res.status(400).json({mns:"Libro no existe"});
            await Libro.update(body,{where: {id:pk}});
        }catch (error){

        }

        const libro: LibroI | null = await Libro.findByPk(pk);
        if(libro) return res.status(200).json({libro});
    }
    
    public async deleteLibro(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const libroExist: LibroI | null = await Libro.findByPk(pk);
            if(!libroExist) return res.status(400).json({mns:"Escribir no existe"});
            await Libro.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Libro Eliminado"})
        }catch (error){

        }

        const libro: LibroI | null = await Libro.findByPk(pk);
        if(libro) return res.status(200).json({libro});
    }
}