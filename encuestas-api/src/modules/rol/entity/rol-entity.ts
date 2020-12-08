import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class RolEntity {
    
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    rol: string;
}
