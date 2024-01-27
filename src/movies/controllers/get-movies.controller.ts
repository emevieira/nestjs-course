import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMoviesResponse } from '../responses/schema';
import { GetMoviesService } from '../services/get-movies.service';

@ApiTags('movies')
@Controller('api')
@ApiBearerAuth()
export class GetMoviesController {
  constructor(private readonly getMoviesService: GetMoviesService) {}

  @ApiResponse({
    status: 200,
    schema: {
      default: GetMoviesResponse,
    },
  })
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'itemsPerPage', type: Number, example: 10 })
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @Get('movies')
  findAll(
    @Query('itemsPerPage') itemsPerPage = 10,
    @Query('page') page = 1,
    @Query('filter') filter?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    itemsPerPage = itemsPerPage > 100 ? 100 : itemsPerPage;

    return this.getMoviesService.findAll(
      itemsPerPage,
      page,
      filter,
      categoryId,
    );
  }
}
