import { Application } from "express";
import { LibroController } from "../controllers/libro.controller";

export class LibroRouter {
    public libroController: LibroController = new LibroController();

    public routes(app: Application): void {
        app.route("/libros").get(this.libroController.getAllLibro);
        app.route("/libro").post(this.libroController.createLibro);
        app.route("/libro/:id").patch(this.libroController.updateLibro);
        app.route("/delete/libro/:id").patch(this.libroController.deleteLibro);
    }
}