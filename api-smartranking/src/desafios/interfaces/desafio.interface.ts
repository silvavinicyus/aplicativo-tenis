import {Document} from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Desafio extends Document {
    dataHoraDesafio: Date;
    status: string;
    dataHoraSolicitação: Date;
    dataHoraResposta: Date;
    solicitante: string;
    categoria: string;
    jogadores: Array<Jogador>
    partida: Partida;
}

export interface Partida extends Document {
    def: Jogador;
    categoria: string;
    resultado: Array<Resultado>;
    jogadores: Array<Jogador>;
}

export interface Resultado extends Document {
    sete: string;
}

