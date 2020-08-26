import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { Model } from 'mongoose';
export declare class JogadoresService {
    private readonly JogadorModel;
    private logger;
    constructor(JogadorModel: Model<Jogador>);
    criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>;
    consultarJogadorPeloEmail(email: string): Promise<Jogador>;
    consultarTodosJogadores(): Promise<Jogador[]>;
    deletarJogador(email: string): Promise<any>;
    private criar;
    private atualizar;
}
