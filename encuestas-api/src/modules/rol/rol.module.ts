import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { RolEntity } from './entity/rol-entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
