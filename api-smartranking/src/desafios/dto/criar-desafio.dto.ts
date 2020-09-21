import { IsNotEmpty, IsDateString, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export class CriarDesafioDto {
    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>
}