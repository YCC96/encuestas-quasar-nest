import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { FormularioEntity } from './entity/formulario-entity';

@Module({
  imports:[TypeOrmModule.forFeature([FormularioEntity])],
  providers: [FormularioService],
  controllers: [FormularioController]
})
export class FormularioModule {}
