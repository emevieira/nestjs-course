import { Module } from '@nestjs/common';
import { CreateMovieController } from './controllers/create-movie.controller';
import { DeleteMovieController } from './controllers/delete-movie.controller';
import { GetMovieController } from './controllers/get-movie-id.controller';
import { GetMoviesController } from './controllers/get-movies.controller';
import { UpdateMovieController } from './controllers/update-movie.controller';
import { CreateMovieService } from './services/create-movie.service';
import { DeleteMovieService } from './services/delete-movie.service';
import { GetMovieService } from './services/get-movie-id.service';
import { GetMoviesService } from './services/get-movies.service';
import { UpdateMovieService } from './services/update-movie.service';

@Module({
  controllers: [
    CreateMovieController,
    UpdateMovieController,
    GetMoviesController,
    GetMovieController,
    DeleteMovieController,
  ],
  providers: [
    CreateMovieService,
    UpdateMovieService,
    GetMoviesService,
    GetMovieService,
    DeleteMovieService,
  ],
  exports: [
    CreateMovieService,
    UpdateMovieService,
    GetMoviesService,
    GetMovieService,
    DeleteMovieService,
  ],
})
export class MoviesModule {}
