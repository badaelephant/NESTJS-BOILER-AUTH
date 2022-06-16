import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.entity';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: dbConfig.synchronize,
      entities: [User, Board],
    }),

    AuthModule,

    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
