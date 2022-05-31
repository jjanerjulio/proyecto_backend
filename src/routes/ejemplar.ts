import { Application } from "express";

import { EjemplarController } from "../controllers/ejemplar.controller";

export class EjemplarRouter {
    public ejemplarController: EjemplarController = new EjemplarController();

    public routes(app: Application): void {
        app.route("/ejemplares").get(this.ejemplarController.getAllEjemplar);
        app.route("/ejemplar").post(this.ejemplarController.createEjemplar);
        app.route("/ejemplar/:id").patch(this.ejemplarController.updateEjemplar);
        app.route("/delete/ejemplar/:id").patch(this.ejemplarController.deleteEjemplar);
    }
}