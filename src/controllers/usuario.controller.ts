import { Request, Response } from "express";
import { Usuario, UsuarioI } from "../models/Usuario";

export class UsuarioController {

    public async getAllUsuario(req:Request,res:Response) {
        try {
            const usuario: UsuarioI[] = await Usuario.findAll({
                where:{activo:true}
            });
            res.status(200).json({usuario});
        } catch (error) {
            
        }
    }

    public async getOneUsuario(req:Request,res:Response) {
        const {id: idParam}= req.params;
        try {
            const usuario: UsuarioI | null = await Usuario.findOne(
                {
                    where: {id: idParam, activo: true}
                }
            );
            res.status(200).json({usuario});
        } catch (error) {
            res.status(500).json({msg:"Error internal"});
            
        }
    }

    public async createUsuario(req:Request,res:Response) {
        const {
            nombre,
            apellido,
            direccion,
            telefono,
            activo
        } = req.body;

        try {
            let body:UsuarioI = {
                nombre,
                apellido,
                direccion,
                telefono,
                activo
            }
            const usuario = await Usuario.create({...body});
            res.status(200).json({usuario});
        } catch (error){

        }
    }

    public async updateUsuario(req:Request,res:Response) {
        const {id:pk} = req.params;

        const {
            nombre,
            apellido,
            direccion,
            telefono,
            activo
        } = req.body;

        try {
            let body:UsuarioI = {
                nombre,
                apellido,
                direccion,
                telefono,
                activo
            }
            const usuarioExist: UsuarioI | null = await Usuario.findByPk(pk);
            if(!usuarioExist) return res.status(400).json({mns:"Usuario no existe"});
            await Usuario.update(body,{where: {id:pk}});
        }catch (error){

        }

        const usuario: UsuarioI | null = await Usuario.findByPk(pk);
        if(usuario) return res.status(200).json({usuario});
    }
    
    public async deleteUsuario(req:Request,res:Response) {
        const {id: pk} = req.params;
        const {id} = req.body;

        try {

            const usuarioExist: UsuarioI | null = await Usuario.findByPk(pk);
            if(!usuarioExist) return res.status(400).json({mns:"Usuario no existe"});
            await Usuario.update({activo:false},{where: {id:pk}});

            return res.status(200).json({msg:"Usuario Eliminado"})
        }catch (error){

        }

        const usuario: UsuarioI | null = await Usuario.findByPk(pk);
        if(usuario) return res.status(200).json({usuario});
    }
}