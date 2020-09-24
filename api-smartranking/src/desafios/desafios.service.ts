import { Injectable, BadRequestException, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Desafio, Partida } from './interfaces/desafio.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { DesafiosController } from './desafios.controller';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';

@Injectable()
export class DesafiosService {
    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
                @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService){}  
    private readonly logger = new Logger(DesafiosController.name);  

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const jogadores = await this.jogadoresService.consultarTodosJogadores();
        
        criarDesafioDto.jogadores.map(jogadorDto => {
            const jogadorFilter = jogadores.filter(jogador => jogador._id == jogadorDto._id);

            if(jogadorFilter.length == 0) {
                throw new BadRequestException(`o id ${jogadorDto._id} não foi encontrado!`);
            }
        })

        const solicitanteEhJogadorDaPartida = await criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante);

        this.logger.log(`solicitanteEhJogadorDaPartida: ${solicitanteEhJogadorDaPartida}`);

        if(solicitanteEhJogadorDaPartida.length == 0) {
            throw new BadRequestException(`o solicitante precisa ser um jogador da partida!`);
        }

        const categoriaJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante);

        if(!categoriaJogador) {
            throw new BadRequestException(`O solicitante precisa estar registrado em alguma categoria`);
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto);
        desafioCriado.categoria = categoriaJogador.categoria;
        desafioCriado.dataHoraSolicitação = new Date();        
        desafioCriado.status = DesafioStatus.PENDENTE;

        return await desafioCriado.save();
    }

    async consultarDesafioDeUmJogador(_id: any): Promise<Array<Desafio>>{ 
        const jogadores = await this.jogadoresService.consultarTodosJogadores();

        const jogadorFilter = jogadores.filter(jogador => jogador._id == _id);

        if(jogadorFilter.length == 0 ) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`);
        }

        return await this.desafioModel.find().where("jogadores").in(_id).populate("solicitante").populate("jogadores").populate("partida").exec();
    }

    async consultarDesafios(): Promise<Array<Desafio>> {
        return await this.desafioModel.find().populate("solicitante").populate("jogadores").populate("partida").exec();
    }

    async atualizarDesafio(_id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void>{
        const desafioEncontrado = await this.desafioModel.findById(_id).exec();

        if(!desafioEncontrado){
            throw new NotFoundException(`Desafio ${_id} não encontrado`);
        }

        if(atualizarDesafioDto.status){
            desafioEncontrado.dataHoraResposta = new Date();
        }
        desafioEncontrado.status = atualizarDesafioDto.status;
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio;

        await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado}).exec();
    }

    async deletarDesafio(_id: string){
        const desafioEncontrado = await this.desafioModel.findById(_id).exec();

        if(!desafioEncontrado) {
            throw new NotFoundException(`O desafio ${_id} não foi encontrado!`);
        }

        desafioEncontrado.status = DesafioStatus.CANCELADO;

        await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado});
    }

    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto): Promise<void>{
        
        const desafioEncontrado = await this.desafioModel.findById(_id).exec();

        if(!desafioEncontrado){            
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`);
        }
        

        const jogadorFilter = desafioEncontrado.jogadores.filter(jogador => jogador._id == atribuirDesafioPartidaDto.def);

        if(jogadorFilter.length == 0){            
            throw new BadRequestException(`O jogador vencedor não faz parte do desafio`);
        }           

        const partidaCriada = new this.partidaModel(atribuirDesafioPartidaDto);                
        
        partidaCriada.categoria = desafioEncontrado.categoria;
        

        partidaCriada.jogadores = desafioEncontrado.jogadores;        

        const resultado = await partidaCriada.save();        

        desafioEncontrado.status = DesafioStatus.REALIZADO;
        
        desafioEncontrado.partida = resultado._id;
        

        try {            
            await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado}).exec();
        } catch(error){
            await this.partidaModel.deleteOne({_id: resultado._id}).exec();
            throw new InternalServerErrorException();
        }

    }
}

