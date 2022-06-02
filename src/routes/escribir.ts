import { Application } from "express";
import { EscribirController } from "../controllers/escribir.controller";

export class EscribirRouter {
    public escribirController: EscribirController = new EscribirController();

    public routes(app: Application): void {
        app.route("/escritos").get(this.escribirController.getAllEscribir);
        app.route("/escritos").post(this.escribirController.createEscribir);
        app.route("/escrito/:id").patch(this.escribirController.updateEscribir);
        app.route("/delete/escrito/:id").patch(this.escribirController.deleteEscribir);
        /* app.route("/ventasCond1/:fechaI/:fechaF").get(this.escribirController.getVentasCondicion1)*/
    }
}