import { EscribirRouter } from "./escribir";
import { AutorRouter } from "./autor"
import { LibroRouter } from "./libro"
import { EjemplarRouter } from "./ejemplar"
import { UsuarioRouter } from "./usuario"
import { PrestarRouter } from "./prestar"

export class Routes {
    public escribirRouter: EscribirRouter = new EscribirRouter();
    public autorRouter: AutorRouter = new AutorRouter();
    public libroRouter: LibroRouter = new LibroRouter();
    public ejemplarRouter: EjemplarRouter = new EjemplarRouter();
    public usuarioRouter: UsuarioRouter = new UsuarioRouter();
    public prestarRouter: PrestarRouter = new PrestarRouter();
}