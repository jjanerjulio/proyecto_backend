import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { Ejemplar } from "./Ejemplar";
import { Usuario } from "./Usuario";


export class Prestar extends Model {
    public fecha_pres!: Date;
    public fecha_dev!: Date;
    public UsuarioId!: number;
    public EjemplarId!: number;
    public activo!: boolean;
}

export interface PrestarI {
    fecha_pres: Date;
    fecha_dev: Date;
    UsuarioId: number;
    EjemplarId: number;
    activo: boolean;

}

Prestar.init(
    {
        fecha_pres: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_dev: {
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
        tableName: "prestar",
        sequelize: database,
        timestamps: false
    }
)

Usuario.belongsToMany(Ejemplar, { through:  Prestar });
Ejemplar.belongsToMany(Usuario, { through: Prestar });
