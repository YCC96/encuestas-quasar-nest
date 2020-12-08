import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, TreeChildren, TreeParent } from 'typeorm';
import { PreguntaEntity } from '../../pregunta/entity/pregunta-entity';
import { EncuestaEntity } from '../../encuesta/entity/encuesta-entity';

@Entity('resp_formulario')
export class RespFormularioEntity {

    @PrimaryGeneratedColumn()
    id_resp_formulario: number;

    @Column()
    identificador: string;

    @Column()
    nom_formulario: string;

    @OneToOne(type => PreguntaEntity)
    @JoinColumn({ name: 'id_pregunta' })
    id_pregunta: PreguntaEntity;

    @Column()
    respuesta: string;

    //@ManyToOne( type => EncuestaEntity, encuesta => encuesta.id_encuesta)
    @OneToOne( type => EncuestaEntity)
    //@TreeParent()
    @JoinColumn({ name: 'id_encuesta'})
    id_encuesta: EncuestaEntity;
}
