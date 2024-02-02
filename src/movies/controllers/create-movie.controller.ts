import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { CreateMovieService } from '../services/create-movie.service';

@ApiTags('Movies')
@Controller('api')
@ApiBearerAuth()
export class CreateMovieController {
  constructor(private readonly createMovieService: CreateMovieService) {}

  @Post('movies')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieService.create(createMovieDto);
  }
}
