import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';
import { PreguntaEntity } from './entity/pregunta-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaEntity])],
  controllers: [PreguntaController],
  providers: [PreguntaService],
  exports: [PreguntaService]
})
export class PreguntaModule {}
