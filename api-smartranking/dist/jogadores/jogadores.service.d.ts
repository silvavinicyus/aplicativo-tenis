import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { Model } from 'mongoose';
export declare class JogadoresService {
    private readonly JogadorModel;
    private logger;
    constructor(JogadorModel: Model<Jogador>);
    criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>;
    atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void>;
    consultarJogadorPeloId(_id: string): Promise<Jogador>;
    consultarTodosJogadores(): Promise<Jogador[]>;
    deletarJogador(_id: string): Promise<any>;
}
