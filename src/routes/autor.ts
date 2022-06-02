import { Application } from "express";

import { AutorController } from "../controllers/autor.controller";

export class AutorRouter {
    public autorController: AutorController = new AutorController();

    public routes(app: Application): void {
        app.route("/autores").get(this.autorController.getAllAutor);
        app.route("/autores").post(this.autorController.createAutor);
        app.route("/autor/:id").patch(this.autorController.updateAutor);
        app.route("/delete/autor/:id").patch(this.autorController.deleteAutor);
    }
}