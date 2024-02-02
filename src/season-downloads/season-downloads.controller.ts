import { Controller, Delete, Param } from '@nestjs/common';
import { SeasonDownloadsService } from './season-downloads.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seasons')
@ApiBearerAuth()
@Controller('api/seasons')
export class SeasonDownloadsController {
  constructor(
    private readonly seasonDownloadsService: SeasonDownloadsService,
  ) {}

  @ApiOkResponse({
    schema: {
      default: { seasonDownloadId: '79c70c23-6624-4f63-bec1-e4b7779f14d0' },
    },
  })
  @Delete('downloads/:seasonDownloadId')
  remove(@Param('seasonDownloadId') seasonDownloadId: string) {
    return this.seasonDownloadsService.remove(+seasonDownloadId);
  }
}
