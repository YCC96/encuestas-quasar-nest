import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus } from '@nestjs/common';
import { FormularioService } from './formulario.service';

@Controller('formulario')
export class FormularioController {
    constructor(private service: FormularioService){}

    @Get('formulariosActivos')
    formActivos(){
        return this.service.formsActivos();
    }

    @Get('formulariosActivos/:id')
    formActivosByIdentificador(@Param() params){
        return this.service.formsActivosByIdentificador(params.id);
    }

    @Get()
    getFormulario() {
        return this.service.findAll();
    }

    @Get(':id')
    getByIdFormulario(@Param() params): any {
        return this.service.findOneFormulario(params.id);
    }

    @Post()
    postFormulario(@Body() model: any): any {
        return this.service.saveFormulario(model);
    }

    @Put(':id')
    putFormulario(@Body() model: any, @Param() params): any {
        return this.service.updateFormulario(params.id, model);
    }

    @Delete(':id')
    deleteFormulario(@Param() params): any {
        return this.service.deleteFormulario(params.id);
    }
    
}
