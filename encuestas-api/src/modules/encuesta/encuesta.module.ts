import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import { EncuestaEntity } from './entity/encuesta-entity';

@Module({
  imports:[TypeOrmModule.forFeature([EncuestaEntity])],
  providers: [EncuestaService],
  controllers: [EncuestaController],
  exports: [EncuestaService]
})
export class EncuestaModule {}
