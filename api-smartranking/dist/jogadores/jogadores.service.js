"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JogadoresService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogadoresService = void 0;
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
let JogadoresService = JogadoresService_1 = class JogadoresService {
    constructor() {
        this.logger = new common_1.Logger(JogadoresService_1.name);
        this.jogadores = [];
    }
    async criarAtualizarJogador(criarJogadorDto) {
        const { email } = criarJogadorDto;
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, criarJogadorDto);
        }
        else {
            await this.criar(criarJogadorDto);
        }
    }
    async consultarJogadorPeloEmail(email) {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador ${email} não encontrado!`);
        }
        return jogadorEncontrado;
    }
    async consultarTodosJogadores() {
        return await this.jogadores;
    }
    async deletarJogador(email) {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador ${email} não encontrado!`);
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }
    criar(criarJogadorDto) {
        const { nome, email, telefoneCelular } = criarJogadorDto;
        const jogador = {
            _id: uuid.v1(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: "google.com/foto123.jpg"
        };
        this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);
    }
    atualizar(jogadorEncontrado, criarJogadorDto) {
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
};
JogadoresService = JogadoresService_1 = __decorate([
    common_1.Injectable()
], JogadoresService);
exports.JogadoresService = JogadoresService;
//# sourceMappingURL=jogadores.service.js.map