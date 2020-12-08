import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatusService } from './estatus.service';
import { EstatusEntity } from './entity/estatus-entity';

@Module({
  imports:[TypeOrmModule.forFeature([EstatusEntity])],
  providers: [EstatusService]
})
export class EstatusModule {}
