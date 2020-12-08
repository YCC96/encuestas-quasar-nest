import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estatus')
export class EstatusEntity {
    
    @PrimaryGeneratedColumn()
    id_estatus: number;

    @Column()
    estatus: string;
}
