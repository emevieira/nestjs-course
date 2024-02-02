import { IsArray, IsNumber, IsString } from 'class-validator';

class DownloadType {
  @IsString()
  provedorName: string;

  @IsString()
  linkDownload: string;
}

export class CreateSeasonDto {
  @IsNumber()
  seasonNumber: number;

  @IsString()
  serieId: string;

  @IsArray()
  downloads: DownloadType[];
}
