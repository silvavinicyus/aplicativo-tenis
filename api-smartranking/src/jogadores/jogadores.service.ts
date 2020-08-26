import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';

@Injectable()
export class JogadoresService {
    private logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{ 
        const {email} = criarJogadorDto;    
        
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        if(jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }                
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador ${email} não encontrado!`); 
        } 
        
        return jogadorEncontrado;               
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }

    async deletarJogador(email: string): Promise<void>{
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador ${email} não encontrado!`); 
        } 

        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }

    private criar(criarJogadorDto: CriarJogadorDto): void {
        const {nome, email, telefoneCelular} = criarJogadorDto;
        const jogador: Jogador = {
            _id: uuid.v1(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: "google.com/foto123.jpg"
        }

        this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador)
    }

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const {nome} = criarJogadorDto;

        jogadorEncontrado.nome = nome;        
    }
}
