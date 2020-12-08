import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, OneToOne, OneToMany, JoinColumn, ManyToOne, TreeChildren, TreeParent, TreeLevelColumn, JoinTable } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entity/usuario-entity';
import { EstatusEntity } from '../../estatus/entity/estatus-entity';

@Entity('encuesta')
export class EncuestaEntity {

    @PrimaryGeneratedColumn()
    id_encuesta: number;

    @Column()
    nom_encuesta: string;

    @Column()
    contestada: number;

    @OneToOne(type => UsuarioEntity)
    @JoinColumn({ name: 'id_usuario' })
    id_usuario: UsuarioEntity;

    @OneToOne(type => EstatusEntity)
    @JoinColumn({ name: 'id_estatus' })
    id_estatus: EstatusEntity;

    @Column({ type: 'date' })
    fecha_creacion: Date

}
