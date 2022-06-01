import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { Libro } from "./Libro";
import { Autor } from "./Autor";


export class Escribir extends Model {
    public Fecha!: Date;
    public AutorId!: number;
    public LibroId!: number;
    public activo!: boolean;
}

export interface EscribirI {
    Fecha: Date;
    AutorId: number;
    LibroId: number;
    activo: boolean;

}

Escribir.init(
    {
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
    },
    {
        tableName: "escribir",
        sequelize: database,
        timestamps: false
    }
)

Autor.belongsToMany(Libro, { through:  Escribir });
Libro.belongsToMany(Autor, { through: Escribir });
