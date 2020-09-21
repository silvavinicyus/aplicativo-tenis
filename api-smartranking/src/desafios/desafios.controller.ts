import { Controller, Post, UsePipes, ValidationPipe, Body, Logger, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { DesafioStatusValidationPipe } from 'src/common/pipes/desafio-status-validation.pipe';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
    constructor(private readonly desafiosService: DesafiosService){}
    private readonly logger = new Logger(DesafiosController.name);

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto
    ): Promise<Desafio> {
        this.logger.log(`criarDesafio: ${JSON.stringify(criarDesafioDto)}`);
        return await this.desafiosService.criarDesafio(criarDesafioDto);
    }

    @Get()
    async consultarDesafios(
        @Query('idJogador') _id: string
    ): Promise<Array<Desafio>>{
        return _id ? await this.desafiosService.consultarDesafioDeUmJogador(_id)
        : await this.desafiosService.consultarDesafios();

    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidationPipe) atualirDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string
    ): Promise<void>{
        return await this.desafiosService.atualizarDesafio(_id, atualirDesafioDto);
    }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('_id') _id: string
    ): Promise<void>{
        return await this.desafiosService.deletarDesafio(_id);
    }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(
        @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        @Param('desafio') _id: string
    ): Promise<void>{
        return await this.desafiosService.atribuirDesafioPartida(_id, atribuirDesafioPartidaDto);
    }
}
