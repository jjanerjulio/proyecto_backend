import { Application } from "express";

import { EscribirController } from "../controllers/escribir.controller";

export class EscribirRouter {
    public escribirController: EscribirController = new EscribirController();

    public routes(app: Application): void {
        app.route("/escritos").get(this.escribirController.getAllEscribir);
        app.route("/escrito").post(this.escribirController.createEscribir);
        app.route("/escrito/:id").patch(this.escribirController.updateEscribir);
        app.route("/delete/escrito/:id").patch(this.escribirController.deleteEscribir);
    }
}