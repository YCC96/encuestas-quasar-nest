import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RespFormularioEntity } from './entity/resp-formulario-entity';

import { EncuestaService } from '../encuesta/encuesta.service';
import { PreguntaService } from '../pregunta/pregunta.service';

@Injectable()
export class RespFormularioService {

    constructor( @InjectRepository(RespFormularioEntity)
        private readonly respFormRR: Repository<RespFormularioEntity>,
        private readonly _servicePregunta:PreguntaService,
        private readonly _serviceEncuesta:EncuestaService
    ){

    }

    async saveResForm(respForm: any) {
        await this.respFormRR.insert(respForm);
        return respForm;
    }

    async updateResForm(id: number, respForm: any) {
        await this.respFormRR.update(id, respForm);
    }

    async updateWithRespuestas(list) {
        var results = [];
        for (let lis of list) {
            var ll = await this.respFormRR.createQueryBuilder()
            .update()
            .set({respuesta: lis.respuesta})
            .where('id_resp_formulario=:id', {id: lis.id_resp_formulario})
            .execute();
            results.push(ll);
        }
        return results;
    }

    async findAll(){
        let resForm: any = this.respFormRR.createQueryBuilder('rf')
            .innerJoinAndSelect('rf.id_pregunta', 'pregunta')
            .innerJoinAndSelect('rf.id_encuesta', 'encuesta')
            .innerJoinAndSelect('encuesta.id_usuario', 'usuario')
            .getMany();
        return await resForm;
    }

    async findOneResForm(idF: number) {
        let resForm = await this.respFormRR.createQueryBuilder('rf')
            .innerJoinAndSelect('rf.id_pregunta', 'pregunta')
            .innerJoinAndSelect('rf.id_encuesta', 'encuesta')
            .innerJoinAndSelect('encuesta.id_usuario', 'usuario')
            .where('usuario.id_usuario=:idd', {idd: idF})
            .groupBy('rf.identificador')
            .getMany();
        return resForm;
    }

    async findOneResFormById(idF: number) {
        let resForm = await this.respFormRR.createQueryBuilder('rf')
            .innerJoinAndSelect('rf.id_pregunta', 'pregunta')
            .innerJoinAndSelect('rf.id_encuesta', 'encuesta')
            .innerJoinAndSelect('encuesta.id_usuario', 'usuario')
            .where('encuesta.id_encuesta=:idd', {idd: idF})
            .getMany();
        return resForm;
    }

    async deleteResForm(id: number) { 
        return await this.respFormRR.delete(id);
    }

    async nuevaEncuesta(body) {
        var listTmpInsertPregunta = [];
        var listIdsPregunta = [];
        for (let lisPregunta of body.listPreguntas) {
            if (lisPregunta.index == 0) {
                listTmpInsertPregunta.push({ pregunta: lisPregunta.value, fecha_creacion:'2020-09-11' });
            } else{
                listIdsPregunta.push({id_pregunta: lisPregunta.index})
            }
        }
        var respIdPreguntas = await this._servicePregunta.insrtarVarios(listTmpInsertPregunta)
        for (let resp of respIdPreguntas.identifiers) {
            listIdsPregunta.push(resp)
        }

        var sendEncuesta = {
            nom_encuesta: body.nombreEncuesta,
            contestada: 0,
            fecha_creacion: "2020-09-11",
            id_usuario: {
                id_usuario: body.idUsuario
            },
            id_estatus: {
                id_estatus: (body.idUsuario===null?1:2)
            }
        }

        var resEncuesta = await this._serviceEncuesta.saveEncuesta(sendEncuesta);

        var sendResForm = [];
        var genIdent = this.generaIdentificador();
        for (let ls of listIdsPregunta) {
            sendResForm.push({
                identificador: genIdent,
                nom_formulario: body.nombreFormulario,
                //fecha_creacion:'2020-09-11',
                id_pregunta: {
                    id_pregunta: ls.id_pregunta
                },
                respuesta: null,
                id_encuesta: {
                    id_encuesta: resEncuesta.id_encuesta
                }
            })
        }
        
        var respResFrom = await this.insertarVarios(sendResForm);
        return respResFrom;
    }

    async insertarVarios(values){
        var resp = await this.respFormRR.createQueryBuilder()
            .insert()
            .values(values)
            .execute();

        return resp;
    }

    private generaIdentificador() {
        let nss = '';
        const letrasNumeros = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const longitud = letrasNumeros.length;
        for ( let i = 0; i < 15; i++ ) {
            nss += letrasNumeros.charAt(Math.floor(Math.random() * longitud));
        }
        return nss;
    }
}
