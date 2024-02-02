import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MoviesModule } from './movies/movies.module';
import { DownloadsModule } from './downloads/downloads.module';
import { CategoriesModule } from './categories/categories.module';
import { SeasonsModule } from './seasons/seasons.module';
import { SeriesModule } from './series/series.module';
import { SeasonDownloadsModule } from './season-downloads/season-downloads.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    MoviesModule,
    DownloadsModule,
    CategoriesModule,
    SeasonsModule,
    SeriesModule,
    SeasonDownloadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
