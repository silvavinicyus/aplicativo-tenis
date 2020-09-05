import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { AtualizarJogadorDto } from './dto/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
export declare class JogadoresController {
    private readonly jogadoresService;
    constructor(jogadoresService: JogadoresService);
    criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>;
    atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, _id: string): Promise<void>;
    consultarTodosJogadores(): Promise<Jogador[]>;
    consultarJogadorPorId(_id: string): Promise<Jogador>;
    deletarJogador(_id: string): Promise<void>;
}
