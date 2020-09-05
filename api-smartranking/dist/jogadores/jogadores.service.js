"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JogadoresService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogadoresService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let JogadoresService = JogadoresService_1 = class JogadoresService {
    constructor(JogadorModel) {
        this.JogadorModel = JogadorModel;
        this.logger = new common_1.Logger(JogadoresService_1.name);
    }
    async criarJogador(criarJogadorDto) {
        const { email } = criarJogadorDto;
        const jogadorEncontrado = await this.JogadorModel.findOne({ email }).exec();
        if (jogadorEncontrado) {
            throw new common_1.BadRequestException(`Jogador com e-mail ${email} já cadastrado!`);
        }
        const jogadorCriado = new this.JogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
    }
    async atualizarJogador(_id, criarJogadorDto) {
        const jogadorEncontrado = await this.JogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador com o ${_id} não foi encontrado!`);
        }
        await this.JogadorModel.findOneAndUpdate({ _id }, { $set: criarJogadorDto }).exec();
    }
    async consultarJogadorPeloId(_id) {
        const jogadorEncontrado = await this.JogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador ${_id} não encontrado!`);
        }
        return jogadorEncontrado;
    }
    async consultarTodosJogadores() {
        return await this.JogadorModel.find().exec();
    }
    async deletarJogador(_id) {
        const jogadorEncontrado = await this.JogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador ${_id} não encontrado!`);
        }
        return await this.JogadorModel.deleteOne({ _id }).exec();
    }
};
JogadoresService = JogadoresService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Jogador')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JogadoresService);
exports.JogadoresService = JogadoresService;
//# sourceMappingURL=jogadores.service.js.map