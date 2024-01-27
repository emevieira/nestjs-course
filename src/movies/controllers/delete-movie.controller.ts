import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteMovieService } from '../services/delete-movie.service';

@ApiTags('movies')
@Controller('api')
@ApiBearerAuth()
export class DeleteMovieController {
  constructor(private readonly deleteMovieService: DeleteMovieService) {}

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
    return this.deleteMovieService.remove(movieId);
  }
}
