import { Module } from '@nestjs/common';
import { SeasonDownloadsService } from './season-downloads.service';
import { SeasonDownloadsController } from './season-downloads.controller';

@Module({
  controllers: [SeasonDownloadsController],
  providers: [SeasonDownloadsService],
})
export class SeasonDownloadsModule {}
