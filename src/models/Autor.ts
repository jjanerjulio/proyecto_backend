import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';

export class Autor extends Model {
    public id!: number;
    public nombre!: string;
    public activo!: boolean;
}

export interface AutorI {
    nombre: string;
    activo: boolean;

}

Autor.init(
    {
        nombre: {
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
        tableName: "autores",
        sequelize: database,
        timestamps: false
    }
)
