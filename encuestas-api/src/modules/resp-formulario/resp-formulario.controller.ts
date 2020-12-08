import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus } from '@nestjs/common';
import { RespFormularioService } from './resp-formulario.service';

@Controller('respFormulario')
export class RespFormularioController {
    constructor(private service: RespFormularioService){}
    
    @Get('idEncuesta/:id')
    getRespFormId(@Param() params) {
        return this.service.findOneResFormById(params.id);
    }

    @Get()
    getRespForm() {
        return this.service.findAll();
    }

    @Get(':id')
    getByIdRespForm(@Param() params): any {
        return this.service.findOneResForm(params.id);
    }

    @Post('nuevaEncuesta')
    postNuevaEncuesta(@Body() model: any): any {
        return this.service.nuevaEncuesta(model);
    }

    @Post('setRespuesta')
    postNuevaRespuesta(@Body() model: any): any {
        return this.service.updateWithRespuestas(model);
    }

    @Post()
    postRespForm(@Body() model: any): any {
        return this.service.saveResForm(model);
    }

    @Put(':id')
    putRespForm(@Body() model: any, @Param() params): any {
        return this.service.updateResForm(params.id, model);
    }

    @Delete(':id')
    deleteRespForm(@Param() params): any {
        return this.service.deleteResForm(params.id);
    }
}
