import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
export declare class JogadoresService {
    private logger;
    private jogadores;
    criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>;
    consultarJogadorPeloEmail(email: string): Promise<Jogador>;
    consultarTodosJogadores(): Promise<Jogador[]>;
    deletarJogador(email: string): Promise<void>;
    private criar;
    private atualizar;
}
