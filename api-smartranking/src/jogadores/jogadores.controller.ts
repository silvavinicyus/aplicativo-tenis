import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import {CriarJogadorDto} from './dto/criar-jogador.dto';
import {AtualizarJogadorDto} from './dto/atualizar-jogador.dto';
import {Jogador} from './interfaces/jogador.interface';
import {JogadoresService} from './jogadores.service';
import {JogadoresValidacaoParametrosPipe} from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }
        
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(        
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<void>{        
        console.log(`O id do jogador: ${_id}`);
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);        
    }

    @Get()
    async consultarTodosJogadores(): Promise<Jogador[]>{                
            return this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPorId(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<Jogador>{                
        return this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')    
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<void> {        
        console.log(`O id do jogador: ${_id}`);
        this.jogadoresService.deletarJogador(_id);
    }
}
