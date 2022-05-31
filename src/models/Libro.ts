import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { Ejemplar } from './Ejemplar';

export class Libro extends Model {
    public id!: number;
    public titulo!: string;
    public numero_pag!: string;
    public editorial!: string;
    public ISBN!: string;
    public activo!: boolean;
}

export interface LibroI {
    titulo: string;
    numero_pag: string;
    editorial: string;
    ISBN: string;
    activo: boolean;
}

Libro.init(
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        numero_pag: {
            type: DataTypes.STRING,
            allowNull: false
        },

        editorial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
    },
    {
        tableName: "libros",
        sequelize: database,
        timestamps: false
    }
)

Libro.hasMany(Ejemplar);
Ejemplar.belongsTo(Libro);