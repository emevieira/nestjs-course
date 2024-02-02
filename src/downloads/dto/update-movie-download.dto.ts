import { PartialType } from '@nestjs/swagger';
import { CreateDownloadDto } from './create-movie-download.dto';

export class UpdateDownloadDto extends PartialType(CreateDownloadDto) {}
