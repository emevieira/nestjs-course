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
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { DownloadDeleteResponse, DownloadRequest } from './responses/schema';

@ApiTags('downloads')
@Controller('api')
@ApiBearerAuth()
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @ApiResponse(DownloadRequest)
  @ApiBody(DownloadRequest)
  @Post('downloads')
  create(@Body() createDownloadDto: CreateDownloadDto[]) {
    return this.downloadsService.create(createDownloadDto);
  }

  @ApiResponse(DownloadRequest)
  @Get('downloads/:downloadId')
  findOne(@Param('downloadId') downloadId: string) {
    return this.downloadsService.findOne(+downloadId);
  }

  @ApiResponse(DownloadRequest)
  @ApiBody(DownloadRequest)
  @Put('downloads/:downloadId')
  update(
    @Param('downloadId') downloadId: string,
    @Body() updateDownloadDto: UpdateDownloadDto,
  ) {
    return this.downloadsService.update(+downloadId, updateDownloadDto);
  }

  @ApiResponse(DownloadDeleteResponse)
  @Delete('downloads/:downloadId')
  remove(@Param('downloadId') downloadId: string) {
    return this.downloadsService.remove(+downloadId);
  }
}
