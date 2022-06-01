import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';


export class Ejemplar extends Model {
    public id!: number;
    public LibroId!: number;
    public localizacion!: string;
    public activo!: boolean;
}

export interface EjemplarI {
    localizacion: string;
    LibroId: number;
    activo: boolean;

}

Ejemplar.init(
    {
        localizacion: {
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
        tableName: "ejemplar",
        sequelize: database,
        timestamps: false
    }
)