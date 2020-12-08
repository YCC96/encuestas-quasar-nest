import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './interface/usuario.interface';

@Controller('usuario')
export class UsuarioController {
    constructor(private service: UsuarioService){}

    @Get()
    async getUsuario() {
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
    getByIdUsuario(@Param() params): any {
        return this.service.findOneUsuario(params.id);
    }
    
    @Post('login')
    validaLogin(@Body() body){
        return this.service.existeUsuario(body);
    }

    @Post()
    postUsuario(@Body() model: Usuario): any {
        return this.service.saveUsuario(model);
    }

    @Put(':id')
    putUsuario(@Body() model: Usuario, @Param() params): any {
        return this.service.updateUsuario(params.id, model);
    }

    @Delete(':id')
    deleteUsuario(@Param() params): any {
        return this.service.deleteUsuario(params.id);
    }

}
