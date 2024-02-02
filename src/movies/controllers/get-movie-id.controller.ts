import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieForId } from '../responses/schema';
import { GetMovieService } from '../services/get-movie-id.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Movies')
@Controller('api')
export class GetMovieController {
  constructor(private readonly getMovieService: GetMovieService) {}

  @IsPublic()
  @ApiResponse({
    status: 200,
    schema: {
      default: MovieForId,
    },
  })
  @Get('movies/:movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.getMovieService.findOne(movieId);
  }
}
