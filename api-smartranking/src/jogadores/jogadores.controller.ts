import { Controller, Post, Body, Get } from '@nestjs/common';
import {CriarJogadorDto} from './dto/criar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface';
import {JogadoresService} from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}
    
    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto){
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async index(){

    }
}
