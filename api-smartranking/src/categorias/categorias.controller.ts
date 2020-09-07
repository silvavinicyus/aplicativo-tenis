import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ): Promise<Categoria>{
        return await this.categoriaService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>>{
        return await this.categoriaService.consultarTodasCategorias();
    }

    @Get('/:_id')
    async consultarCategoriaPeloId(
        @Param('_id') _id: string
    ): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPeloId(_id);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('_id') _id: string,
    ): Promise<void>{
        await this.categoriaService.atualizarCategoria(_id, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:idJogador')    
    async atribuirCategoriaJogador(
        @Param() params: string[]
    ):Promise<void>{
        await this.categoriaService.atualizarCategoriaJogador(params);
    }
}
