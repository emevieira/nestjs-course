import { Body, Controller, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateMovie } from '../responses/schema';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { UpdateMovieService } from '../services/update-movie.service';

@ApiTags('Movies')
@Controller('api')
@ApiBearerAuth()
export class UpdateMovieController {
  constructor(private readonly updateMovieService: UpdateMovieService) {}

  @ApiOkResponse({ schema: { default: UpdateMovie } })
  @ApiBody({ schema: { default: UpdateMovie } })
  @Put('movies/:movieId')
  update(
    @Param('movieId') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.updateMovieService.update(movieId, updateMovieDto);
  }
}
