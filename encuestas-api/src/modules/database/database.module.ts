import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RolEntity } from '../rol/entity/rol-entity';
import { UsuarioEntity } from '../usuario/entity/usuario-entity';
import { PreguntaEntity } from '../pregunta/entity/pregunta-entity';
import { EncuestaEntity } from '../encuesta/entity/encuesta-entity';
import { EstatusEntity } from '../estatus/entity/estatus-entity';
import { FormularioEntity } from '../formulario/entity/formulario-entity';
import { RespFormularioEntity } from '../resp-formulario/entity/resp-formulario-entity';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'welcome1',
            database: 'encuestas',
            entities:[
                RolEntity,
                UsuarioEntity,
                PreguntaEntity,
                EncuestaEntity,
                EstatusEntity,
                FormularioEntity,
                RespFormularioEntity
            ],
            synchronize: false
        })
    ]})
export class DatabaseModule {}
