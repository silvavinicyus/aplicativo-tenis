import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Vinicyus:B9O3TKfXqfBDQru7@cluster0.5fgj6.mongodb.net/smartranking?retryWrites=true&w=majority',
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
    ),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
