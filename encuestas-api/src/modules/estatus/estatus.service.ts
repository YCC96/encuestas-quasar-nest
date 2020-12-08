import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstatusEntity } from './entity/estatus-entity';

@Injectable()
export class EstatusService {
    constructor( @InjectRepository(EstatusEntity)
    private readonly estatusRR: Repository<EstatusEntity>){

    }

    async saveEstatus(estatus: any) {
        await this.estatusRR.insert(estatus);
        return estatus;
    }

    async updateEstatus(id: number, estatus: any) {
        await this.estatusRR.update(id, estatus);
    }

    async findAll(){
        return await this.estatusRR.find();
    }

    async findOneEstatus(id: number) {
        return await this.estatusRR.findOne(id);
    }

    async deleteEstatus(id: number) { 
        return await this.estatusRR.delete(id);
    }
}
