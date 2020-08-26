import { CriarJogadorDto } from './dto/criar-jogador.dto';
export declare class JogadoresService {
    private logger;
    private jogadores;
    criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>;
    private criar;
}
