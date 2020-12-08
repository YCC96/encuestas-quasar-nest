import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './interface/rol.interface';

@Controller('rol')
export class RolController {
    constructor(private rolService: RolService){}

    @Get()
    getRol(): any {
        return this.rolService.findAll();
    }

    @Get(':id')
    getByIdRol(@Param() params): any {
        return this.rolService.findOneRol(params.id);
    }

    @Post()
    postRol(@Body() model: Rol): any {
        return this.rolService.saveRol(model);
    }

    @Put(':id')
    putRol(@Body() model: Rol, @Param() params): any {
        return this.rolService.updateRol(params.id, model);
    }

    @Delete(':id')
    deleteRol(@Param() params): any {
        return this.rolService.deleteRol(params.id);
    }

}
