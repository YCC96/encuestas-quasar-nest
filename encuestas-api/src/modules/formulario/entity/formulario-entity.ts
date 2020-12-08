import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { PreguntaEntity } from '../../pregunta/entity/pregunta-entity';

@Entity('formulario')
export class FormularioEntity {

    @PrimaryGeneratedColumn()
    id_formulario: number;

    @Column()
    identificador: string;

    @Column()
    nom_formulario: string;

    @OneToOne(type => PreguntaEntity)
    @JoinColumn({ name: 'id_pregunta' })
    id_pregunta: PreguntaEntity;

    @Column({ type: 'date' })
    fecha_creacion: Date;

}
