import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormularioEntity } from './entity/formulario-entity';

@Injectable()
export class FormularioService {
    constructor( @InjectRepository(FormularioEntity)
    private readonly formularioRR: Repository<FormularioEntity>){

    }

    async saveFormulario(formulario: any) {
        await this.formularioRR.insert(formulario);
        return formulario;
    }

    async updateFormulario(id: number, formulario: any) {
        await this.formularioRR.update(id, formulario);
    }

    async findAll(){
        let form: any = this.formularioRR.createQueryBuilder('formulario')
            .innerJoinAndSelect('formulario.id_pregunta', 'pregunta')
            .getMany();
        return await form;
    }

    async findOneFormulario(id: number) {
        return await this.formularioRR.findOne(id);
    }

    async deleteFormulario(id: number) { 
        return await this.formularioRR.delete(id);
    }

    async formsActivos(){
        let form: any = await this.formularioRR.createQueryBuilder('f')
            .select('f.id_formulario')
            .addSelect('f.identificador')
            .addSelect('f.nom_formulario')
            .groupBy('f.identificador')
            .getMany();
        return form;
    }

    async formsActivosByIdentificador(id){
        let lista = {
            identificador: '',
            nomFormulario: '',
            listaPreguntas: []
        };
        let form: any = await this.formularioRR.createQueryBuilder('f')
            .select('f.identificador')
            .addSelect('f.nom_formulario')
            .addSelect('p.id_pregunta')
            .addSelect('p.pregunta')
            .innerJoin('f.id_pregunta', 'p')
            .where('f.identificador=:id', {id: id})
            .getMany();
        lista.identificador = form[0].identificador;
        lista.nomFormulario = form[0].nom_formulario;
        for (let li of form) {
            lista.listaPreguntas.push(li.id_pregunta);
        }
        
        return lista;
    }
}
