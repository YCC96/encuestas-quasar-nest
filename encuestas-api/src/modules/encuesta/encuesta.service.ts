import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncuestaEntity } from './entity/encuesta-entity';

@Injectable()
export class EncuestaService {
    constructor(@InjectRepository(EncuestaEntity)
    private readonly encuestaRR: Repository<EncuestaEntity>){}

    async saveEncuesta(encuesta: any) {
        var date = new Date();
        var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDay()
        let encuestaCompleto = {
        ...encuesta,
        fecha_creacion: fecha
        }
        await this.encuestaRR.insert(encuestaCompleto);
        return encuestaCompleto;
    }

    async updateEncuesta(id: number, encuesta: any) {
        return await this.encuestaRR.update(id, encuesta);
    }

    async findAll(){
        const usuar = this.encuestaRR.createQueryBuilder('encuesta')
        .leftJoinAndSelect('encuesta.id_usuario', 'usuario')
        .leftJoinAndSelect('encuesta.id_estatus', 'estatus')
        .getMany();
        return await usuar;
    }

    async findOneEncuesta(id: number) {
        let usuar: any = this.encuestaRR.createQueryBuilder('encuesta')
        .leftJoinAndSelect('encuesta.id_usuario', 'usuario')
        .leftJoinAndSelect('encuesta.id_estatus', 'estatus')
        .where('encuesta.id_encuesta = :id', { id: id })
        .getMany();
        return await usuar;
    }

    async findOneEncuestaByIdentificador(id: string) {
        let usuar: any = this.encuestaRR.createQueryBuilder('encuesta')
        .leftJoinAndSelect('encuesta.id_pregunta', 'pregunta')
        .leftJoinAndSelect('encuesta.id_usuario', 'usuario')
        .where('encuesta.identificador = :id', { id: id })
        .getMany();
        return await usuar;
    }

    async deleteEncuesta(id: number) { 
        return await this.encuestaRR.delete(id);
    }

}
