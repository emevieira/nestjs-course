import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DownloadsService } from './downloads.service';
import { CreateDownloadDto } from './dto/create-movie-download.dto';
import { UpdateDownloadDto } from './dto/update-movie-download.dto';
import { DownloadDeleteResponse, DownloadRequest } from './responses/schema';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Movie Downloads')
@Controller('api/movies')
@ApiBearerAuth()
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @ApiResponse(DownloadRequest)
  @ApiBody(DownloadRequest)
  @Post('downloads')
  create(@Body() createDownloadDto: CreateDownloadDto[]) {
    return this.downloadsService.create(createDownloadDto);
  }

  @IsPublic()
  @ApiResponse(DownloadRequest)
  @Get('downloads/:movieDownloadId')
  findOne(@Param('movieDownloadId') movieDownloadId: string) {
    return this.downloadsService.findOne(+movieDownloadId);
  }

  @ApiResponse(DownloadRequest)
  @ApiBody(DownloadRequest)
  @Put('downloads/:movieDownloadId')
  update(
    @Param('movieDownloadId') movieDownloadId: string,
    @Body() updateDownloadDto: UpdateDownloadDto,
  ) {
    return this.downloadsService.update(+movieDownloadId, updateDownloadDto);
  }

  @ApiResponse(DownloadDeleteResponse)
  @Delete('downloads/:movieDownloadId')
  remove(@Param('movieDownloadId') movieDownloadId: string) {
    return this.downloadsService.remove(+movieDownloadId);
  }
}
