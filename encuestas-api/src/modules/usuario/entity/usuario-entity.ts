import { type } from 'os';
import { join } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { RolEntity } from '../../rol/entity/rol-entity';

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nom_usuario:string;

    @Column()
    contrasena: string;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @Column()
    correo_electronico: string;

    @Column({ type: 'date' })
    fecha_creacion: Date;

    @OneToOne(type => RolEntity)
    @JoinColumn({ name:'id_rol' })
    id_rol: RolEntity;
}
