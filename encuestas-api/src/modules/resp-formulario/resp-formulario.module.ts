import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespFormularioController } from './resp-formulario.controller';
import { RespFormularioService } from './resp-formulario.service';
import { RespFormularioEntity } from './entity/resp-formulario-entity';

import { PreguntaModule } from '../pregunta/pregunta.module';
import { EncuestaModule } from '../encuesta/encuesta.module';

@Module({
  imports:[TypeOrmModule.forFeature([RespFormularioEntity]), PreguntaModule, EncuestaModule],
  controllers: [RespFormularioController],
  providers: [RespFormularioService]
})
export class RespFormularioModule {}
