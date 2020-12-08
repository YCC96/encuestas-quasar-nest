import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from './entity/rol-entity';

@Injectable()
export class RolService {
    constructor( @InjectRepository(RolEntity)
    private readonly rolRR: Repository<RolEntity>){

    }

    async saveRol(rol: any) {
        await this.rolRR.insert(rol);
        return rol;
    }

    async updateRol(id: number, rol: any) {
        await this.rolRR.update(id, rol);
    }

    async findAll(){
        return await this.rolRR.find();
    }

    async findOneRol(id: number) {
        return await this.rolRR.findOne(id);
    }

    async deleteRol(id: number) { 
        return await this.rolRR.delete(id);
    }
}
