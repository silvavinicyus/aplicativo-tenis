import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

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

    @Get('/:categoria')
    async consultarCategoriaPeloId(
        @Param('categoria') categoria: string
    ): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPeloId(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string,
    ): Promise<void>{
        await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:idJogador')    
    async atribuirCategoriaJogador(
        @Param() params: string[]
    ):Promise<void>{
        await this.categoriaService.atualizarCategoriaJogador(params);
    }

    @Get('/jogador/:_id')
    async consultarCategoriaDoJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: any
    ): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaDoJogador(_id);
    }
}
