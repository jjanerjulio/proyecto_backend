import { Application } from "express";

import { PrestarController } from "../controllers/prestar.controller";

export class PrestarRouter {
    public prestarController: PrestarController = new PrestarController();

    public routes(app: Application): void {
        app.route("/prestarlib").get(this.prestarController.getAllPrestar);
        app.route("/prestarlib").post(this.prestarController.createPrestar);
        app.route("/prestamo/:id").patch(this.prestarController.updatePrestar);
        app.route("/delete/prestamo/:id").patch(this.prestarController.deletePrestar);
    }
}