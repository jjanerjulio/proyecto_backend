import { Application } from "express";

import { UsuarioController } from "../controllers/usuario.controller";

export class UsuarioRouter {
    public usuarioController: UsuarioController = new UsuarioController();

    public routes(app: Application): void {
        app.route("/usuarios").get(this.usuarioController.getAllUsuario);
        app.route("/usuario").post(this.usuarioController.createUsuario);
        app.route("/usuario/:id").patch(this.usuarioController.updateUsuario);
        app.route("/delete/usuario/:id").patch(this.usuarioController.deleteUsuario);
    }
}