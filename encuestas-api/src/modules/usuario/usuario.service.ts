import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entity/usuario-entity';

@Injectable()
export class UsuarioService {

    private respuesta = {
        estatus: 0,
        mensaje: '',
        response: null
    }

    constructor( @InjectRepository(UsuarioEntity)
    private readonly usuarioRR: Repository<UsuarioEntity>){

    }

    async saveUsuario(usuario: any) {
        var date = new Date();
        var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDay()
        let usuarioCompleto = {
        ...usuario,
        fecha_creacion: fecha
        }
        await this.usuarioRR.insert(usuarioCompleto);
        return usuarioCompleto;
    }

    async updateUsuario(id: number, usuario: any) {
        return await this.usuarioRR.update(id, usuario);
    }

    async findAll(){
        const usuar = this.usuarioRR.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.id_rol', 'rol')
        .getMany();
        return await usuar;
    }

    async findOneUsuario(id: number) {
        let usuar: any = this.usuarioRR.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.id_rol', 'rol')
        .where('usuario.id_usuario = :id', { id: id })
        .getMany();
        var r = await usuar;
        delete r[0].contrasena
        return await usuar;
    }

    async deleteUsuario(id: number) { 
        return await this.usuarioRR.delete(id);
    }

    async existeUsuario(body: any) {
        let usuar = await this.usuarioRR.createQueryBuilder('u')
            .leftJoinAndSelect('u.id_rol', 'rol')
            .where('u.correo_electronico=:correo', { correo: body.correo })
            .andWhere('u.contrasena=:pass', { pass: body.password })
            .getOne();

        if (usuar === undefined) {
            this.respuesta.estatus = 200;
            this.respuesta.mensaje = 'SUCCESS';
            this.respuesta.response = {
                existe: false
            }
        } else {
            this.respuesta.estatus = 200;
            this.respuesta.mensaje = 'SUCCESS';
            this.respuesta.response = {
                idUsuario: usuar.id_usuario,
                usuario: usuar.nom_usuario,
                nombre: usuar.nombre,
                apellidos: usuar.apellidos,
                rol: usuar.id_rol.rol,
                existe: true
            }
        }
        return this.respuesta;
    }

}
