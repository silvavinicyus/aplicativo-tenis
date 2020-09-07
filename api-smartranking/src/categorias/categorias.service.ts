import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
        const {categoria} = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();        

        if(categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada!`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>>{
        return await this.categoriaModel.find().populate("jogadores").exec();
    }

    async consultarCategoriaPeloId(_id: string): Promise<Categoria> {

        const categoriaEncontrada = await this.categoriaModel.findOne({_id}).populate("jogadores").exec();        

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${_id} não existe!`);
        }

        return categoriaEncontrada;
    }

    async atualizarCategoria(_id: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({_id}).exec();

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${_id} não existe!`);
        }

        await this.categoriaModel.findOneAndUpdate({_id}, {$set: atualizarCategoriaDto}).exec();
    }

    async atualizarCategoriaJogador(params: string[]){
        const categoria = params['categoria'];
        const idJogador = params['idJogador'];

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
        const jogadorCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec();
        await this.jogadoresService.consultarJogadorPeloId(idJogador);
        

        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }   

        if(jogadorCadastradoCategoria.length > 0){
            throw new BadRequestException(`Jogador ${idJogador} já cadastrado nessa categoria`);
        }

        categoriaEncontrada.jogadores.push(idJogador);

        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: categoriaEncontrada}).exec();
    }
}
