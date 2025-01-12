import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memoryStorage } from 'multer';

import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/entities/card.entity';
import { StudySet } from './study-sets/entities/study-set.entity';
import { StudySetsModule } from './study-sets/study-sets.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, RefreshToken, StudySet, Card],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    CardsModule,
    StudySetsModule,
  ],
})
export class AppModule {}
