import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    private logger = new Logger(JogadoresService.name);    

    constructor(@InjectModel('Jogador') private readonly JogadorModel: Model<Jogador>) {}

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{ 
        const {email} = criarJogadorDto;    
                
        const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();

        if(jogadorEncontrado) {
            await this.atualizar(criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }                
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador ${email} não encontrado!`); 
        } 
        
        return jogadorEncontrado;               
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.JogadorModel.find().exec();
    }

    async deletarJogador(email: string): Promise<any>{
        return await this.JogadorModel.remove({email}).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.JogadorModel(criarJogadorDto);

        return await jogadorCriado.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.JogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();
    }
}
