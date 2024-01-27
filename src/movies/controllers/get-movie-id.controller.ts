import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieForId } from '../responses/schema';
import { GetMovieService } from '../services/get-movie-id.service';

@ApiTags('movies')
@Controller('api')
@ApiBearerAuth()
export class GetMovieController {
  constructor(private readonly getMovieService: GetMovieService) {}

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
