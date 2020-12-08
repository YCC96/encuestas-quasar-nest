import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { Encuesta } from './interface/encuesta.interface';

@Controller('encuesta')
export class EncuestaController {
    constructor(private service: EncuestaService){}

    @Get()
    async getEncuesta() {
        var response = {
            status: 0,
            mensaje: '',
            response: null
        }
        var respuesta = await this.service.findAll();
        response.status = 200;
        response.mensaje = 'SUCCESS';
        response.response = respuesta;
        return response;
    }

    @Get(':id')
    getByIdEncuesta(@Param() params): any {
        return this.service.findOneEncuesta(params.id);
    }

    @Get('identificador/:id')
    getByIdentificador(@Param() params): any {
        return this.service.findOneEncuestaByIdentificador(params.id);
    }

    @Post()
    postEncuesta(@Body() model: Encuesta): any {
        return this.service.saveEncuesta(model);
    }

    @Put(':id')
    putEncuesta(@Body() model: Encuesta, @Param() params): any {
        return this.service.updateEncuesta(params.id, model);
    }

    @Delete(':id')
    deleteEncuesta(@Param() params): any {
        return this.service.deleteEncuesta(params.id);
    }
}
