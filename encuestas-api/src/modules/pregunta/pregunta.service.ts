import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreguntaEntity } from './entity/pregunta-entity';

@Injectable()
export class PreguntaService {
    constructor( @InjectRepository(PreguntaEntity)
        private readonly preguntaRR: Repository<PreguntaEntity>) {
    }

    async savePregunta(pregunta: any) {
        await this.preguntaRR.insert(pregunta);
        return pregunta;
    }

    async updatePregunta(id: number, pregunta: any) {
        await this.preguntaRR.update(id, pregunta);
    }

    async findAll(){
        return await this.preguntaRR.find();
    }

    async findOnePregunta(id: number) {
        return await this.preguntaRR.findOne(id);
    }

    async deletePregunta(id: number) { 
        return await this.preguntaRR.delete(id);
    }

    async insrtarVarios(values){
        var resp = await this.preguntaRR.createQueryBuilder()
            .insert()
            .values(values)
            .execute();

        return resp;
    }
}
