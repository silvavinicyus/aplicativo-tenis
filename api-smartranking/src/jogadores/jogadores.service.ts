import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {    
    private logger = new Logger(JogadoresService.name);    

    constructor(@InjectModel('Jogador') private readonly JogadorModel: Model<Jogador>) {}

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{ 
        const {email} = criarJogadorDto;    
                
        const jogadorEncontrado = await this.JogadorModel.findOne({email}).exec();

        if(jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado!`)
        }
        
        const jogadorCriado = new this.JogadorModel(criarJogadorDto);

        return await jogadorCriado.save();                      
    }

    async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void>{         
                
        const jogadorEncontrado = await this.JogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o ${_id} não foi encontrado!`)
        }
        
        await this.JogadorModel.findOneAndUpdate({_id}, {$set: criarJogadorDto}).exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.JogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador ${_id} não encontrado!`); 
        } 
        
        return jogadorEncontrado;               
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.JogadorModel.find().exec();
    }

    async deletarJogador(_id: string): Promise<any>{ 
        const jogadorEncontrado = await this.JogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador ${_id} não encontrado!`); 
        }        
        return await this.JogadorModel.deleteOne({_id}).exec();
    }
}
