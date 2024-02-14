import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray } from 'class-validator';

class DownloadTypes {
  movieDownloadId?: string;
  provedorName: string;
  linkDownload: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsArray()
  downloads: DownloadTypes[];
}
