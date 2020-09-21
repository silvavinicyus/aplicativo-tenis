import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: {type: Date},
    status: {type: String},
    dataHoraSolicitacao: {type: String},
    dataHoraResposta: {type: String},
    solicitante: {type: mongoose.Schema.Types.ObjectId, ref: 'Jogador'},
    categoria: {type: String, ref: 'Categoria'},
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador'
    }],
    partida: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partida'
    }]
}, {timestamps: true, collection: 'desafios'})