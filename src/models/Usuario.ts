import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';


export class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public direccion!: string;
    public telefono!: string;
    public activo!: boolean;
}

export interface UsuarioI {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    activo: boolean;

}

Usuario.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
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
        tableName: "usuario",
        sequelize: database,
        timestamps: false
    }
)