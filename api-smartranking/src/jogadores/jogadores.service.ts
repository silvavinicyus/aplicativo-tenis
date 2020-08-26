import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import * as uuid from 'uuid';

@Injectable()
export class JogadoresService {
    private logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{        
        await this.criar(criarJogadorDto);
    }

    private criar(criarJogadorDto: CriarJogadorDto): void {
        const {nome, email, telefoneCelular} = criarJogadorDto;
        const jogador: Jogador = {
            _id: uuid.v1(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: "google.com/foto123.jpg"
        }

        this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador)
    }
}
