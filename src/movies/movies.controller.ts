import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('movies')
@Controller('api')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('movies')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Movie),
    },
  })
  @Get('movies')
  findAll(
    @Query('filter') filter?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.moviesService.findAll(filter, categoryId);
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Movie),
    },
  })
  @Get('movies/:movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.moviesService.findOne(movieId);
  }

  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(Movie),
    },
  })
  @Put('movies/:movieId')
  update(
    @Param('movieId') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, updateMovieDto);
  }

  @ApiResponse({
    status: 200,
    schema: {
      default: {
        movieId: '1f3af8a3-e54a-4953-b494-8c75e8e6aa01',
      },
    },
  })
  @Delete('movies/:movieId')
  remove(@Param('movieId') movieId: string) {
    return this.moviesService.remove(movieId);
  }
}
