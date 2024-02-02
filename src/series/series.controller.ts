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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { SeriesService } from './series.service';
import { getSerieResponse } from './responses/schemas';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Series')
@ApiBearerAuth()
@Controller('api')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(CreateSeriesDto),
    },
  })
  @Post('series')
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(CreateSeriesDto),
    },
  })
  @IsPublic()
  @ApiQuery({ name: 'filter', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'itemsPerPage', type: Number, example: 10 })
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @Get('series')
  findAll(
    @Query('itemsPerPage') itemsPerPage = 10,
    @Query('page') page = 1,
    @Query('filter') filter?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    itemsPerPage = itemsPerPage > 100 ? 100 : itemsPerPage;

    return this.seriesService.findAll(itemsPerPage, page, filter, categoryId);
  }

  @ApiOkResponse({
    schema: { default: getSerieResponse },
  })
  @IsPublic()
  @Get('series/:serieId')
  findOne(@Param('serieId') serieId: string) {
    return this.seriesService.findOne(serieId);
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(CreateSeriesDto),
    },
  })
  @Put('series/:serieId')
  update(
    @Param('serieId') serieId: string,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesService.update(serieId, updateSeriesDto);
  }

  @ApiOkResponse({
    schema: {
      default: { serieId: '79c70c23-6624-4f63-bec1-e4b7779f14d0' },
    },
  })
  @Delete('series/:serieId')
  remove(@Param('serieId') serieId: string) {
    return this.seriesService.remove(serieId);
  }
}
