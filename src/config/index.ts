import express, {Application} from "express";
import {Routes} from "../routes/index";
import cors from "cors"

export class App {
    app: Application;
    public route: Routes = new Routes();
    constructor(
        private port ? : number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(cors());
    }

    async listen() {
        await this.app.listen(this.app.get("port"));
        console.log("Server on port ", this.app.get("port"));
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        this.route.escribirRouter.routes(this.app);
        this.route.autorRouter.routes(this.app);
        this.route.libroRouter.routes(this.app);
        this.route.ejemplarRouter.routes(this.app);
        this.route.usuarioRouter.routes(this.app);
        this.route.prestarRouter.routes(this.app);
    }
}