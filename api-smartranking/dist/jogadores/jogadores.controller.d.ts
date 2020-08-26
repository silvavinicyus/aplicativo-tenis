import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
export declare class JogadoresController {
    private readonly jogadoresService;
    constructor(jogadoresService: JogadoresService);
    criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>;
    consultarTodosJogadores(email: string): Promise<Jogador[] | Jogador>;
    deletarJogador(email: string): Promise<void>;
}
