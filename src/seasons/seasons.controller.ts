import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonsService } from './seasons.service';
import { Season } from './entities/season.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Seasons')
@ApiBearerAuth()
@Controller('api')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post('seasons')
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(Season),
    },
  })
  @IsPublic()
  @Get('seasons/:seasonId')
  findOne(@Param('seasonId') seasonId: string) {
    return this.seasonsService.findOne(seasonId);
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(Season),
    },
  })
  @Put('seasons/:seasonId')
  update(
    @Param('seasonId') seasonId: string,
    @Body() updateSeasonDto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(seasonId, updateSeasonDto);
  }

  @ApiOkResponse({
    schema: { default: { seasonId: '79c70c23-6624-4f63-bec1-e4b7779f14d0' } },
  })
  @Delete('seasons/:seasonId')
  remove(@Param('seasonId') seasonId: string) {
    return this.seasonsService.remove(seasonId);
  }
}
