import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { Pregunta } from './interface/pregunta.interface';

@Controller('pregunta')
export class PreguntaController {
    constructor(private preguntaService: PreguntaService){}

    @Get()
    getPregunta(): any {
        return this.preguntaService.findAll();
    }

    @Get(':id')
    getByIdPregunta(@Param() params): any {
        return this.preguntaService.findOnePregunta(params.id);
    }

    @Post()
    postPregunta(@Body() model: Pregunta): any {
        return this.preguntaService.savePregunta(model);
    }

    @Put(':id')
    putPregunta(@Body() model: Pregunta, @Param() params): any {
        return this.preguntaService.updatePregunta(params.id, model);
    }

    @Delete(':id')
    deletePregunta(@Param() params): any {
        return this.preguntaService.deletePregunta(params.id);
    }
}
