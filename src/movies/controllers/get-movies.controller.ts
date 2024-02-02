import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GetMoviesResponse } from '../responses/schema';
import { GetMoviesService } from '../services/get-movies.service';

@ApiTags('Movies')
@Controller('api')
export class GetMoviesController {
  constructor(private readonly getMoviesService: GetMoviesService) {}

  @ApiResponse({
    status: 200,
    schema: {
      default: GetMoviesResponse,
    },
  })
  @IsPublic()
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
