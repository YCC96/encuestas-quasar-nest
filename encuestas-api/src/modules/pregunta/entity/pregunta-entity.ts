import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pregunta')
export class PreguntaEntity {

    @PrimaryGeneratedColumn()
    id_pregunta: number;

    @Column()
    pregunta: string;

    @Column({ type: 'date'})
    fecha_creacion: Date;
}
