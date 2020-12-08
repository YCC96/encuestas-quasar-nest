import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { RolModule } from './modules/rol/rol.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PreguntaModule } from './modules/pregunta/pregunta.module';
import { EncuestaModule } from './modules/encuesta/encuesta.module';
import { EstatusModule } from './modules/estatus/estatus.module';
import { FormularioModule } from './modules/formulario/formulario.module';
import { RespFormularioModule } from './modules/resp-formulario/resp-formulario.module';

@Module({
  imports: [DatabaseModule, RolModule, UsuarioModule, PreguntaModule, EncuestaModule, EstatusModule, FormularioModule, RespFormularioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
